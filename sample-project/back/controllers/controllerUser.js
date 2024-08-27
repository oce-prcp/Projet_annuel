const User = require('../models/modelUser')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.CreateUser = async (req, res) => {
    try {
        const { name, firstname, email, phone, password } = req.body;
        let role = 0;
        if (!name || !firstname || !email || !phone || !password) {
            return res.status(400).json('Tous les champs sont obligatoires');
        }

        const existingUser = await User.findOne({ where: { user_email: email } });
        if (existingUser) {
            console.log('Un utilisateur avec cet email existe déjà');
            return res.status(400).json(error, 'Un utilisateur avec cet email existe déjà');
        }
        const existingUserPhone = await User.findOne({ where: { user_tel: phone } });
        if (existingUserPhone) {
            console.log('Un utilisateur avec ce numéro de téléphone existe déjà');
            return res.status(401).json(error, 'Un utilisateur avec ce numéro de téléphone existe déjà');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            user_nom: name,
            user_prenom: firstname,
            user_email: email,
            user_pass: hashedPassword,
            user_tel: phone,
            user_type: "user",
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

        const validPassword = await bcrypt.compare(password, user.user_pass);
        if (!validPassword) {
            console.log('Mot de passe incorrect');
            return res.status(401).json('Mot de passe incorrect');
        }

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Utilisateur connecté avec succès');
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            console.log('Utilisateur non trouvé');
            return res.status(401).json('Utilisateur non trouvé');
        }
        await User.destroy({ where: { user_id: id } });
        console.log('Utilisateur supprimé avec succès');
        res.status(200).json('Utilisateur supprimé avec succès');

    } catch (error) {
        res.status(500).json(error);
    }
}

exports.GetUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { user_id: id } });
        if (!user) {
            console.log('Utilisateur non trouvé');
            return res.status(401).json('Utilisateur non trouvé');
        }
        console.log('Utilisateur trouvé avec succès');
        res.status(200).json(user);        
    } catch (error) {
            res.status(500).json(error);
    }
}

