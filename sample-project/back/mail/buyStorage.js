require ('dotenv').config();

const mailBodyStoragePurchase = (firstname) => {
    return {
        subject: "Confirmation de l'achat d'espace de stockage",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <div style="background-color: #038A8A; padding: 10px 20px;">
                        <h1 style="color: #ffffff; text-align: center;">Merci pour votre achat, ${firstname} !</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Bonjour ${firstname},</p>
                        <p>Nous vous confirmons que votre achat de <strong>20 Go</strong> d'espace de stockage supplémentaire a été effectué avec succès. Vous pouvez dès maintenant profiter de cet espace pour stocker plus de fichiers sur notre plateforme.</p>
                        <p>Vous pouvez consulter les détails de cette transaction et accéder à vos factures dans la section "Mon compte".</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL}/invoice" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px; margin-bottom: 10px;">
                                Voir mes factures dans Mon compte
                            </a>
                            <a href="${process.env.FRONTEND_URL}/subscription" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px; margin-bottom: 10px;">
                                Acheter plus de stockage
                            </a>
                            <a href="${process.env.FRONTEND_URL}/dashboard" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px;">
                                Uploader des fichiers maintenant
                            </a>
                        </div>
                        <p style="margin-top: 20px;">Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter.</p>
                        <p>Cordialement,<br>L'équipe Support</p>
                    </div>
                </div>
            </div>
        `
    };
}

module.exports = mailBodyStoragePurchase;