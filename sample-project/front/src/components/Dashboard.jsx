// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './Dashboard.css';

const Dashboard = () => {
    const [userId, setUserId] = useState(null);
    const [files, setFiles] = useState([]);
    const [subscription, setSubscription] = useState({});
    const [storageUsed, setStorageUsed] = useState(0);
    const [storageLimit, setStorageLimit] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate(); // Utiliser useNavigate

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
            const userId = userResponse.data.userId;
            setUserId(userId);

            const fileResponse = await axios.get(`http://localhost:8000/files/user/${userId}`);
            setFiles(fileResponse.data);

            const subscriptionResponse = await axios.get(`http://localhost:8000/subscription/get/${userId}`);
            setSubscription(subscriptionResponse.data);
            setStorageLimit(subscriptionResponse.data.subscription_storage_space);

            const userDetailsResponse = await axios.get(`http://localhost:8000/user/get/${userId}`);
            setStorageUsed(userDetailsResponse.data.user_storage_space_used);

        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    const bytesToGigabytes = (bytes) => (bytes / 1073741824).toFixed(2);
    const bytesToMegabytes = (bytes) => (bytes / 1048576).toFixed(2);

    const storageUsedInGB = bytesToGigabytes(storageUsed);
    const storageLimitInGB = bytesToGigabytes(storageLimit);
    const storagePercentage = Math.min((storageUsed / storageLimit) * 100, 100);

    const getColorForStorage = () => {
        if (storagePercentage < 50) return '#328000'; // Vert
        if (storagePercentage < 80) return '#FFA500'; // Orange
        return '#FF0000'; // Rouge
    };

    const handleDelete = async (fileId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/files/${fileId}`);
                await fetchData(); // Met à jour les données après suppression
            } catch (error) {
                console.error('Erreur lors de la suppression du fichier:', error);
            }
        }
    };

    const handleDownload = (fileId) => {
        const confirmDownload = window.confirm("Êtes-vous sûr de vouloir télécharger ce fichier ?");
        if (confirmDownload) {
            window.open(`http://localhost:8000/files/download/${fileId}`, '_blank');
        }
    };

    const handleView = (fileId) => {
        window.open(`http://localhost:8000/files/see/${fileId}`, '_blank');
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', userId);

            try {
                const response = await axios.post('http://localhost:8000/files/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                await fetchData(); // Met à jour les données après téléchargement
                setShowModal(false); // Fermer la modal après téléchargement réussi
                console.log('Fichier téléchargé avec succès:', response.data.message);
            } catch (error) {
                console.error('Erreur lors du téléchargement du fichier:', error);
            }
        }
    };

    // Fonction pour rediriger vers la page d'abonnement
    const handleSubscriptionRedirect = () => {
        navigate('/subscription');
    };

    return (
        <div className="dashboard">
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

            <div className="file-list-section">
                <h2 className="dashboard-title">Mes Fichiers</h2>
                <div className="file-list-header">
                    <span>Nom</span>
                    <span>Date d'ajout</span>
                    <span>Taille</span>
                    <span>Actions</span>
                </div>
                <div className="file-list">
                    {files.length > 0 ? (
                        files.map((file) => (
                            <div key={file.file_id} className="file-card">
                                <img src="/img/file-icon.png" alt="file" className="file-icon" />
                                <span className="file-name" onClick={() => handleView(file.file_id)} style={{ cursor: 'pointer', color: '#038A8A' }}>
                                    {file.file_name}
                                </span>
                                <span className="file-date">{new Date(file.file_date).toLocaleString()}</span>
                                <span className="file-size">{bytesToMegabytes(file.file_size)} Mo</span>
                                <span className="file-actions">
                                    <img 
                                        src="/img/delete-icon.png" 
                                        alt="delete" 
                                        className="action-icon" 
                                        onClick={(e) => { e.stopPropagation(); handleDelete(file.file_id); }} 
                                    />
                                    <img 
                                        src="/img/download-icon.png" 
                                        alt="download" 
                                        className="action-icon" 
                                        onClick={(e) => { e.stopPropagation(); handleDownload(file.file_id); }} 
                                    />
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="no-files-message">Aucun fichier trouvé.</p>
                    )}
                </div>
            </div>

            <div className="add-file-button-container">
                <button className="add-file-button" onClick={handleShowModal}>+</button>
            </div>

            {/* Modal pour l'upload de fichier */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un fichier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="upload-container">
                        <label htmlFor="file-upload" className="upload-label">
                            Déposer vos fichiers ici ou cliquer pour télécharger
                        </label>
                        <input 
                            id="file-upload" 
                            type="file" 
                            onChange={handleFileUpload} 
                            style={{ display: 'none' }} 
                        />
                    </div>
                    <p className="upload-info">Taille maximum : 300 Mo</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Fermer</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Dashboard;
