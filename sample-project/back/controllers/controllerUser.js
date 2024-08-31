    const User = require('../models/modelUser')
    const Invoice = require('../models/modelInvoice')
    const Subscription = require('../models/modelSubscription')
    const File = require('../models/modelFile')

    require ('dotenv').config()

    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    const nodemailer = require('nodemailer');
    
    const mailBody = require('../mail/accountCreate');
    const mailBodyAccountDeletion = require('../mail/accountDelete');
    const mailBodyAccountDeletionAdmin = require('../mail/accountDeleteAdmin');

    const transporter = nodemailer.createTransport({
        service: 'gmail',   
        auth: {
            user: process.env.EMAIL_CONTACT,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    
    const sendWelcomeEmail = (email, userName) => {
        const mailOptions = mailBody(userName); // Utiliser mailBody pour créer le corps de l'e-mail
        mailOptions.from = "datasavecontact@gmail.com"; // Définir l'expéditeur
        mailOptions.to = email; // Définir le destinataire
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
            }
            console.log('E-mail envoyé avec succès:', info.response);
        });
    };
    
    const sendDeleteEmail = (email, userName) => {
        const mailOptions = mailBodyAccountDeletion(userName);
        mailOptions.from = "datasavecontact@gmail.com";
        mailOptions.to = email;
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
            }
            console.log('E-mail envoyé avec succès:', info.response);
        });
    };

    const sendDeleteEmailAdmin = (userName, fileCount) => {
        const mailOptions = mailBodyAccountDeletionAdmin(userName, fileCount);
        mailOptions.from = "datasavecontact@gmail.com";
        mailOptions.to = process.env.EMAIL_CONTACT;
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
            }
            console.log('E-mail envoyé avec succès:', info.response);
        });
    }


    exports.CreateUser = async (req, res) => {
        try {
            const { name, firstname, email, phone, password, adress } = req.body;
            if (!name || !firstname || !email || !phone || !password) {
                return res.status(400).json('Tous les champs sont obligatoires');
            }

            const existingUser = await User.findOne({ where: { user_email: email } });
            if (existingUser) {
                console.log('Un utilisateur avec cet email existe déjà');
                return res.status(400).json(error, 'Un utilisateur avec cet email existe déjà');
            }
            const existingUserPhone = await User.findOne({ where: { user_phone: phone } });
            if (existingUserPhone) {
                console.log('Un utilisateur avec ce numéro de téléphone existe déjà');
                return res.status(401).json(error, 'Un utilisateur avec ce numéro de téléphone existe déjà');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                user_name: name,
                user_first_name: firstname,
                user_phone: phone,
                user_email: email,
                user_storage_space_used: 0,
                user_password: hashedPassword,
                user_address: adress,
                user_type: "user"
            });
            console.log('Utilisateur créé avec succès :', user);

            sendWelcomeEmail(email, firstname);

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        } 
    }

    exports.LoginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json('Tous les champs sont obligatoires');
            }

            const user = await User.findOne({ where: { user_email: email } });
            if (!user) {
                console.log('Utilisateur non trouvé');
                return res.status(401).json('Utilisateur non trouvé');
            }

            const validPassword = await bcrypt.compare(password, user.user_password);
            if (!validPassword) {
                console.log('Mot de passe incorrect');
                return res.status(401).json('Mot de passe incorrect');
            }

            const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            res.cookie("auth_token", token, {
            });
            console.log('Utilisateur connecté avec succès');
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    exports.DeleteUser = async (req, res) => {
        const { user_id } = req.params;

        if (!user_id) {
            console.log('Utilisateur non trouvé');
            return res.status(401).json('Utilisateur non trouvé');
        }

        try {
            const invoicesDeleted = await Invoice.destroy({ where: { user_id: user_id } });
            if (invoicesDeleted > 0) {
                console.log(`Factures supprimées : ${invoicesDeleted}`);
            } else {
                console.log('Aucune facture trouvée pour cet utilisateur');
            }

            const subscriptionDeleted = await Subscription.destroy({ where: { user_id: user_id } });
            if (subscriptionDeleted > 0) {
                console.log('Abonnement supprimé');
            } else {
                console.log('Aucun abonnement trouvé pour cet utilisateur');
            }

            const fileCount = await File.count({ where: { user_id: user_id } });
            
            const filesDeleted = await File.destroy({ where: { user_id: user_id } });
            if (filesDeleted > 0) {
                console.log(`Fichiers supprimés : ${filesDeleted}`);
            } else {
                console.log('Aucun fichier trouvé pour cet utilisateur');
            }

            const user = await User.findOne({ where: { user_id: user_id } });

            sendDeleteEmail(user.user_email, user.user_first_name);
            sendDeleteEmailAdmin(user.user_first_name, fileCount);


            const userDeleted = await User.destroy({ where: { user_id: user_id } });
            if (userDeleted > 0) {
                console.log('Utilisateur supprimé avec succès');

                return res.status(200).json('Utilisateur supprimé avec succès');
            } else {
                console.log('Aucun utilisateur trouvé avec cet identifiant');
                return res.status(404).json('Aucun utilisateur trouvé avec cet identifiant');
            }

            

        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            return res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de l\'utilisateur.' });
        }
    };


    exports.GetUser = async (req, res) => {
        try {
            const { user_id } = req.params;
            if (!user_id) {
                return res.status(400).json({ message: 'ID utilisateur manquant dans les paramètres de la requête.' });
            }

            const user = await User.findOne({ where: { user_id: user_id } });

            if (!user) {
                console.log(`Utilisateur avec l'ID ${user_id} non trouvé`);
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            console.log(`Utilisateur avec l'ID ${user_id} trouvé avec succès`);
            return res.status(200).json(user);

        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur:', error);
            return res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur', error });
        }
    };

    exports.GetUserId = async (req, res) => {
        const token = req.cookies.auth_token;

        if (!token) {
            console.log('Token non trouvé');
            return res.status(401).json('Token non trouvé');
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.status(200).json({ message: 'Accès accordé', userId: decoded.id });
        } catch (error) {
            res.status(401).json({ message: 'Token invalide ou expiré' });
        }
    }


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
};

exports.getTotalUserCount = async (req, res) => {
    try {
        const totalUsers = await User.count();
        res.status(200).json({ totalUsers });
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre total d\'utilisateurs:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du nombre total d\'utilisateurs' });
    }
};

exports.GetTotalStorageUsed = async (req, res) => {
    try {
        const users = await User.findAll();
        const totalStorageUsed = users.reduce((acc, user) => acc + user.user_storage_space_used, 0);

        res.status(200).json({ totalStorageUsed });
    } catch (error) {
        console.error('Erreur lors de la récupération du stockage total utilisé:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération du stockage total utilisé' });
    }
};