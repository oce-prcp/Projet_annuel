const Subscription = require('../models/modelSubscription')

exports.CreateSubscription = async (req, res) => {
    const { user_id, storage, price, date } = req.body;

    if (!user_id || !storage || !price || !date) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires : user_id, storage, price, date.' });
    }

    try {
        const existingSubscription = await Subscription.findOne({ where: { user_id: user_id } });

        if (existingSubscription) {
            return res.status(400).json({ message: 'Une souscription existe déjà pour cet utilisateur.' });
        }

        const subscription = await Subscription.create({
            user_id: user_id,
            subscription_storage_space: storage,
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

        // Si la souscription n'existe pas, retourner une erreur
        if (!subscription) {
            return res.status(404).json({ message: 'Souscription non trouvée pour cet utilisateur.' });
        }

        // Mettre à jour le champ storage en ajoutant 20 à sa valeur actuelle
        subscription.subscription_storage_space += 20;
        subscription.subscription_price += 20;

        await subscription.save();

        res.status(200).json(subscription);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la mise à jour de la souscription.', details: error });
    }
};

exports.GetSubscription = async (req, res) => {
    const { user_id } = req.params;
    try {
        const subscription = await Subscription.findOne({ where: { user_id: user_id } });
        if (!subscription) {
            console.log('Abonnement non trouvé');
            return res.status(401).json('Abonnement non trouvé');
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


