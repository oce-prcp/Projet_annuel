const Subscription = require('../models/modelSubscription')

exports.CreateSubscription = async (req, res) => {
    const { user_id, storage, price, date } = req.body;
    try {
        const subscription = await Subscription.create({
            user_id: user_id,
            subscription_storage_space: storage,
            subscription_price: price,
            subscription_date: date
        });
        res.status(201).json(subscription);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.UpdateSubscription = async (req, res) => {
    const { user_id, storage, price, date } = req.body;
    try {
        const subscription = await Subscription.create({
            user_id: user_id,
            subscription_storage_space: storage,
            subscription_price: price,
            subscription_date: date
        });
        res.status(201).json(subscription);
    } catch (error) {
        res.status(400).json(error);
    }
}

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


