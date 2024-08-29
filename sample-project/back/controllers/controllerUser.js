const User = require('../models/modelUser')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',// Utiliser 'true' en production avec HTTPS
            maxAge: 3600000 // 1 heure
        });

        console.log('Utilisateur connecté avec succès');
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await User.findOne({ where: { user_id: user_id } });
        if (!user) {
            console.log('Utilisateur non trouvé');
            return res.status(401).json('Utilisateur non trouvé');
        }
        await User.destroy({ where: { user_id: user_id } });
        console.log('Utilisateur supprimé avec succès');
        res.status(200).json('Utilisateur supprimé avec succès');

    } catch (error) {
        res.status(500).json(error);
    }
}

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

