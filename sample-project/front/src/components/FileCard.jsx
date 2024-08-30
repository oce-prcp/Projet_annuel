import React, { useState } from 'react';
import './Dashboard.css';

const FileCard = ({ file, handleDelete, handleDownload, handleView }) => {
    const { file_id, file_name, file_date, file_size, file_format } = file;

    const [showModal, setShowModal] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');

    const bytesToMegabytes = (bytes) => (bytes / 1048576).toFixed(2);

    const getFileIcon = (format) => {
        if (format === "application/pdf") return '/img/file-pdf.png';
        switch (format.split("/")[0]) {
            case 'image':
                return '/img/file-image.png';
            case 'video':
                return '/img/file-video.png';
            case 'audio':
                return '/img/file-audio.png';
            case 'text':
                return '/img/file-txt.png';
            default:
                return '/img/file-other.png';
        }
    };

    const handleViewFile = (fileId, format) => {
        const fileCategory = format.split("/")[0];
        if (fileCategory === 'application' && format !== "application/pdf") {
            alert("Impossible d'ouvrir ce fichier");
            return;
        }
        
        if (fileCategory === 'autres') {
            alert("Impossible d'ouvrir ce fichier");
            return;
        }

        setIframeSrc(`http://localhost:8000/files/see/${fileId}`);
        setShowModal(true);
    };

    return (
        <div className="file-card">
            <img src={getFileIcon(file_format)} alt="file" className="file-icon" />
            <span className="file-name" onClick={() => handleViewFile(file_id, file_format)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {file_name}
            </span>
            <span className="file-date">{new Date(file_date).toLocaleString()}</span>
            <span className="file-size">{bytesToMegabytes(file_size)} Mo</span>
            <span className="file-actions">
                <img 
                    src="/img/delete-icon.png" 
                    alt="delete" 
                    className="action-icon" 
                    onClick={(e) => { e.stopPropagation(); handleDelete(file_id); }} 
                />
                <img 
                    src="/img/download-icon.png" 
                    alt="download" 
                    className="action-icon" 
                    onClick={(e) => { e.stopPropagation(); handleDownload(file_id); }} 
                />
            </span>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <iframe src={iframeSrc} title="File Viewer" className="file-viewer"></iframe>
                        <button className="modal-close-button" onClick={() => setShowModal(false)}>x</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileCard;
