require ('dotenv').config();

const mailBodyAccountDeletion = (firstname) => {
    return {
        subject: "Confirmation de la suppression de votre compte",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <div style="background-color: #038A8A; padding: 10px 20px;">
                        <h1 style="color: #ffffff; text-align: center;">Votre compte a été supprimé, ${firstname}</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Bonjour ${firstname},</p>
                        <p>Nous vous confirmons que votre compte a été supprimé avec succès. Toutes vos données, y compris vos fichiers, ont été effacées de notre système.</p>
                        <p>Merci d'avoir utilisé notre service de gestion de fichiers. Nous espérons que vous avez eu une expérience satisfaisante. Si vous changez d'avis, vous êtes toujours le bienvenu pour revenir.</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL}/" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px; margin-bottom: 10px;">
                                Revenir à la page d'accueil
                            </a>
                            <a href="${process.env.FRONTEND_URL}/" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px;">
                                Contacter le support
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

module.exports = mailBodyAccountDeletion;