const jwt = require('jsonwebtoken');
const User = require('../models/modelUser');
require('dotenv').config();

exports.user = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).send('Aucun token');
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        console.error('Erreur lors de la vérification du token:', err);
        return res.status(400).send('Token invalide');
    }
};

exports.admin = async (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).send('Accès refusé');
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        // Assurez-vous que cette requête est correcte pour votre ORM
        const user = await User.findOne({ where: { user_id: verified.id } });

        if (user && user.user_type === 'admin') {
            next();
        } else {
            return res.status(401).send('Accès refusé pour les utilisateurs non-admin');
        }
    } catch (err) {
        console.error('Erreur lors de la vérification de l\'admin:', err);
        return res.status(500).send('Erreur interne du serveur'); // Utiliser un message générique en production
    }
};
