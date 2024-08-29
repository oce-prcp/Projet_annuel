const Invoice = require('../models/modelInvoice');

exports.CreateInvoice = async (req, res) => {
    const { user_id } = req.body;

    if (!user_id ) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires : user_id, subscription_id, invoice_date, invoice_price.' });
    }

    try {
        const invoice = await Invoice.create({
            user_id: user_id
        });

        res.status(201).json(invoice);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création de la facture.', details: error });
    }
};

exports.GetInvoice = async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ message: 'Le champ user_id est obligatoire.' });
    }

    try {
        const invoice = await Invoice.findAll({ where: { user_id: user_id } });

        if (!invoice) {
            return res.status(404).json({ message: 'Facture non trouvée pour cet utilisateur.' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la facture.' });
    }
}