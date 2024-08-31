const fs = require('fs');
const path = require('path');
const File = require('../models/modelFile');
const User = require('../models/modelUser');
const Subscription = require('../models/modelSubscription');
const { Op } = require('sequelize');


exports.uploadFile = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.body.userId;

        if (!file) {
            return res.status(400).json({ message: 'Veuillez télécharger un fichier.' });
        }

        const user = await User.findByPk(userId);
        const subscription = await Subscription.findOne({ where: { user_id: userId } });

        if (!user || !subscription) {
            return res.status(404).json({ message: "Utilisateur ou abonnement non trouvé." });
        }

        const currentStorageUsed = user.user_storage_space_used || 0;
        const maxStorageAllowed = subscription.subscription_storage_space;
        const newFileSize = file.size;

        if ((currentStorageUsed + newFileSize) > maxStorageAllowed) {
            return res.status(400).json({ message: "Vous avez dépassé la limite de stockage maximale autorisée par votre abonnement." });
        }

        await user.update({ user_storage_space_used: currentStorageUsed + newFileSize });

        const filePath = `${req.file.destination}/${req.file.filename}`;

        const newFile = await File.create({
            user_id: userId,
            file_name: file.originalname,
            file_size: newFileSize,
            file_date: new Date(),
            file_format: file.mimetype,
            file_path: filePath
        });

        res.status(200).json({
            message: 'Fichier téléchargé et métadonnées enregistrées avec succès',
            file: newFile
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors du téléchargement du fichier.' });
    }
};

exports.getFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findByPk(fileId);

        if (!file) {
            return res.status(404).json({ message: "Fichier non trouvé." });
        }

        const filePath = path.resolve(file.file_path);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "Fichier non trouvé sur le serveur." });
        }

        res.sendFile(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du fichier.' });
    }
};

exports.getFileDetails = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findByPk(fileId);

        if (!file) {
            return res.status(404).json({ message: "Fichier non trouvé." });
        }

        res.status(200).json({file});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des détails du fichier.' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findByPk(fileId);

        if (!file) {
            return res.status(404).json({ message: "Fichier non trouvé." });
        }

        const filePath = path.resolve(file.file_path);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const user = await User.findByPk(file.user_id);
        if (user) {
            const newStorageUsed = user.user_storage_space_used - file.file_size;
            await user.update({ user_storage_space_used: newStorageUsed });
        }

        await file.destroy();

        res.status(200).json({ message: "Fichier supprimé avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du fichier.' });
    }
};

exports.getUserFiles = async (req, res) => {
    try {
        const { userId } = req.params;
        const files = await File.findAll({ where: { user_id: userId } });

        if (!files || files.length === 0) {
            return res.status(404).json({ message: "Aucun fichier trouvé pour cet utilisateur." });
        }

        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des fichiers.' });
    }
};

exports.getTotalFileCountUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const totalFiles = await File.count({ where: { user_id: userId } });
        res.status(200).json({ totalFiles });
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de fichiers:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du nombre total de fichiers' });
    }
};

exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.findAll();

        if (!files || files.length === 0) {
            return res.status(404).json({ message: "Aucun fichier trouvé." });
        }

        res.status(200).json(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des fichiers.' });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const file = await File.findByPk(fileId);

        if (!file) {
            return res.status(404).json({ message: "Fichier non trouvé." });
        }

        const filePath = path.resolve(file.file_path);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "Fichier non trouvé sur le serveur." });
        }

        // Utilisez res.download pour envoyer le fichier en tant que téléchargement
        res.download(filePath, file.file_name, (err) => {
            if (err) {
                console.error("Erreur lors du téléchargement du fichier:", err);
                res.status(500).json({ message: 'Erreur lors du téléchargement du fichier.' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du fichier.' });
    }
};

exports.getTotalFileCount = async (req, res) => {
    try {
        const totalFiles = await File.count();
        res.status(200).json({ totalFiles });
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de fichiers:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du nombre total de fichiers' });
    }
};

exports.getFilesUploadedToday = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filesUploadedToday = await File.count({
            where: {
                file_date: {
                    [Op.gte]: today
                }
            }
        });

        res.status(200).json({ filesUploadedToday });
    } catch (error) {
        console.error('Erreur lors de la récupération des fichiers uploadés aujourd\'hui:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des fichiers uploadés aujourd\'hui' });
    }
};