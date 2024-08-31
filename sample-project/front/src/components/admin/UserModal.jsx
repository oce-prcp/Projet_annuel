// UserModal.jsx
import React from 'react';
import './UserModal.css';

const UserModal = ({ selectedUser, userFileCount, userStorageUsed, subscriptionDetails, setShowUserModal }) => {
    const formatRevenue = (revenue) => {
        return `${parseFloat(revenue).toFixed(2)} €`;
    };

    const calculateStoragePercentage = (used, total) => {
        return total ? ((used / total) * 100).toFixed(2) : 0;
    };

    return (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Détails de l'utilisateur</h2>
                    <button className="modal-close-button" onClick={() => setShowUserModal(false)}>Fermer</button>
                </div>
                <div className="user-details">
                    <div className="basic-info">
                        <p><strong>Nom prénom:</strong> {selectedUser.user_name} {selectedUser.user_first_name}</p>
                        <p><strong>Email:</strong> {selectedUser.user_email}</p>
                        <p><strong>Téléphone:</strong> {selectedUser.user_phone}</p>
                        <p><strong>Rôle:</strong> {selectedUser.user_type}</p>
                        <p><strong>Adresse:</strong> {selectedUser.user_address}</p>
                    </div>
                    <div className="stats-box-details">
                        <h4>Stockage utilisé</h4>
                        <div className="progress-container">
                            <div
                                className="progress-bar"
                                style={{
                                    width: `${calculateStoragePercentage(userStorageUsed, subscriptionDetails?.subscription_storage_space)}%`,
                                    backgroundColor: calculateStoragePercentage(userStorageUsed, subscriptionDetails?.subscription_storage_space) > 50 
                                    ? 'orange' 
                                    : calculateStoragePercentage(userStorageUsed, subscriptionDetails?.subscription_storage_space) > 75 ? 'red' 
                                    : '#328000',
                                }}
                            ></div>
                        </div>
                        <p>{(userStorageUsed / 1073741824).toFixed(2)} Go ({calculateStoragePercentage(userStorageUsed, subscriptionDetails?.subscription_storage_space)}%)</p>
                    </div>
                    <div className="stats-box-details">
                        <h4>Nombre de fichiers</h4>
                        <p>{userFileCount}</p>
                    </div>
                    {subscriptionDetails ? (
                        <div className="stats-box-details">
                            <h4>Souscription</h4>
                            <p>Prix payé: {formatRevenue(subscriptionDetails.subscription_price)}</p>
                            <p>Stockage payé: {((subscriptionDetails.subscription_storage_space) / 1073741824).toFixed(2)} Go</p>
                        </div>
                    ) : (
                        <div className="stats-box-details">
                            <h4>Souscription</h4>
                            <p>Aucune souscription pour cet utilisateur</p>
                        </div>
                    )}
                </div>
                <button className="delete-account-button" onClick={() => console.log('Supprimer le compte')}>Supprimer le compte</button>
            </div>
        </div>
    );
};

export default UserModal;
