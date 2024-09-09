const Subscription = require('../models/modelSubscription');
const User = require('../models/modelUser')

require ('dotenv').config()
const nodemailer = require('nodemailer');
const mailBodyStoragePurchase = require('../mail/buyStorage');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_CONTACT,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendBuyEmail = (email, firstname) => {
    const mailOptions = mailBodyStoragePurchase(firstname);
    mailOptions.from = "datasavecontact@gmail.com";
    mailOptions.to = email;

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
        }
        console.log('E-mail envoyé avec succès:', info.response);
    });
};

exports.CreateSubscription = async (req, res) => {
    const { user_id, price, date } = req.body;

    if (!user_id || !price || !date) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires : user_id, price, date.' });
    }

    try {
        const existingSubscription = await Subscription.findOne({ where: { user_id: user_id } });

        if (existingSubscription) {
            return res.status(200).json({ message: 'Une souscription existe déjà pour cet utilisateur.' });
        }

        const subscription = await Subscription.create({
            user_id: user_id,
            subscription_storage_space: 21474836480.00,
            subscription_price: price,
            subscription_date: date
        });

        res.status(201).json(subscription);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de la souscription.', details: error });
    }
};

exports.UpdateSubscription = async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ message: 'Le champ user_id est obligatoire.' });
    }

    try {
        const subscription = await Subscription.findOne({ where: { user_id: user_id } });
    
        if (!subscription) {
            return res.status(404).json({ message: 'Souscription non trouvée pour cet utilisateur.' });
        }

        await subscription.increment({
            subscription_storage_space: 21474836480.00,
            subscription_price: 20.0000
        });
    
        await subscription.reload();

        const user = await User.findOne({ where: { user_id: user_id } });
        sendBuyEmail(user.user_email, user.user_first_name);

        res.status(200).json(subscription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la souscription.' });
    }
    
};

exports.GetSubscription = async (req, res) => {
    const { user_id } = req.params;
    try {
        const subscription = await Subscription.findOne({ where: { user_id: user_id } });
        if (!subscription) {
            console.log('Abonnement non trouvé');
            return res.status(201).json('Abonnement non trouvé');
        }
        console.log('Abonnement trouvé avec succès');
        res.status(200).json(subscription);
    }
    catch (error) {
        res.status(500).json(error);
    }
}
exports.DeleteSubscription = async (req, res) => {
    const { user_id } = req.params;
    try {
        const subscription = await Subscription.findOne({ where: { user_id: user_id } });
        if (!subscription) {
            console.log('Abonnement non trouvé');
            return res.status(401).json('Abonnement non trouvé');
        }
        await Subscription.destroy({ where: { user_id: user_id } });
        console.log('Abonnement supprimé avec succès');
        res.status(200).json('Abonnement supprimé avec succès');
    }
    catch (error) {
        res.status(500).json(error);
    }
}

exports.GetSubscriptionStats = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        const totalStorage = subscriptions.reduce((acc, sub) => acc + sub.subscription_storage_space, 0);
        const totalRevenue = subscriptions.reduce((acc, sub) => acc + sub.subscription_price, 0);

        res.status(200).json({ totalStorage, totalRevenue });
    } catch (error) {
        console.error('Erreur lors de la récupération des statistiques des abonnements:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des statistiques des abonnements' });
    }
};
