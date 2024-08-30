import React from 'react';
import './Dashboard.css';

const SubscriptionInfo = ({ storageLimitInGB, storageUsedInGB, storagePercentage, handleSubscriptionRedirect }) => {
    const getColorForStorage = () => {
        if (storagePercentage < 50) return '#328000'; // Vert
        if (storagePercentage < 80) return '#FFA500'; // Orange
        return '#FF0000'; // Rouge
    };

    return (
        <div className="subscription-info-container">
            <div className="subscription-box">
                <h3>Mon Abonnement</h3>
                <p>{storageLimitInGB} Go</p>
            </div>
            <div className="subscription-box">
                <h3>Espace Utilisé</h3>
                <p>{storageUsedInGB} Go</p>
            </div>
            <div className="subscription-box">
                <h3>Utilisation du Stockage</h3>
                <div className="pourcentageDiv">
                    <span className="storage-indicator" style={{ backgroundColor: getColorForStorage() }}>
                    </span>
                    <p><strong>{storagePercentage.toFixed(2)}%</strong></p>
                </div>
                <button className="add-storage-button" onClick={handleSubscriptionRedirect}>
                    Augmenter votre stockage
                </button>
            </div>
        </div>
    );
};

export default SubscriptionInfo;
