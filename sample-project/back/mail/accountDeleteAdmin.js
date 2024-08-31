require ('dotenv').config();

const mailBodyAdminAccountDeletion = (userName, fileCount) => {
    return {
        subject: "Suppression de compte utilisateur",
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <div style="background-color: #E74C3C; padding: 10px 20px;">
                        <h1 style="color: #ffffff; text-align: center;">Compte utilisateur supprimé</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Bonjour,</p>
                        <p>Le compte utilisateur suivant a été supprimé :</p>
                        <ul>
                            <li><strong>Utilisateur :</strong> ${userName}</li>
                            <li><strong>Nombre de fichiers supprimés :</strong> ${fileCount}</li>
                        </ul>
                        <p>Cette opération a entraîné la suppression de ${fileCount} fichier(s) associé(s) à cet utilisateur.</p>
                    </div>
                </div>
            </div>
        `
    };
}

module.exports = mailBodyAdminAccountDeletion;