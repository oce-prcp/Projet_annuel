require ('dotenv').config()

const mailBody = (firstname) => {
    return {
        subject: "Bienvenue sur Data Save !",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <div style="background-color: #038A8A; padding: 10px 20px;">
                        <h1 style="color: #ffffff; text-align: center;">Bienvenue sur la plateforme, ${firstname} !</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Bonjour ${firstname},</p>
                        <p>Merci de rejoindre Data Save. Nous sommes ravis de vous avoir parmi nous.</p>
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${process.env.FRONTEND_URL}/" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px;">
                                Visiter notre site
                            </a>
                            <a href="${process.env.FRONTEND_URL}/dashboard" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px; margin-bottom: 10px;">
                                Accéder à mes fichiers
                            </a>
                            <a href="${process.env.FRONTEND_URL}/subscription" style="display: block; padding: 15px; background-color: #038A8A; color: #ffffff; text-decoration: none; border-radius: 5px; margin-bottom: 10px;">
                                Effectuer un achat
                            </a>
                            
                        </div>
                        <p style="margin-top: 20px;">Nous espérons que vous apprécierez notre service. Si vous avez des questions, n'hésitez pas à nous contacter.</p>
                        <p>Cordialement,<br>L'équipe Support</p>
                    </div>
                </div>
            </div>
        `
    };
}

module.exports = mailBody;
