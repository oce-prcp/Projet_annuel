import React from 'react';
import ReactDOM from 'react-dom/client'; // Remarque: on importe maintenant 'react-dom/client'
import App from './app';

// Cherchez l'élément dans le DOM où vous voulez monter votre application
const rootElement = document.getElementById('root');

// Assurez-vous que cet élément existe dans votre index.html
if (rootElement) {
    // Utilisez la nouvelle méthode createRoot
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Aucun élément DOM trouvé avec l'id 'root'");
}
