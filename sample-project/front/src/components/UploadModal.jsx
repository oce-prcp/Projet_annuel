import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './Dashboard.css';

const UploadModal = ({ showModal, handleCloseModal, handleFileUpload }) => {
    return (
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
    );
};

export default UploadModal;
