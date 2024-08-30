import React from 'react';
import FileCard from './FileCard';
import './Dashboard.css';

const FileList = ({ filteredFiles, handleSort, handleDelete, handleDownload, handleView }) => {
    return (
        <div className="file-list-section">
            <h2 className="dashboard-title">Mes Fichiers</h2>
            <div className="file-list-header">
                <button className="file-list-button" onClick={() => handleSort('file_name')}>Nom</button>
                <button className="file-list-button" onClick={() => handleSort('file_date')}>Date d'ajout</button>
                <button className="file-list-button" onClick={() => handleSort('file_size')}>Taille</button>
                <span className="file-list-header-action">Actions</span>
            </div>
            <div className="file-list">
                {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                        <FileCard
                            key={file.file_id}
                            file={file}
                            handleDelete={handleDelete}
                            handleDownload={handleDownload}
                            handleView={handleView}
                        />
                    ))
                ) : (
                    <p className="no-files-message">Aucun fichier trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default FileList;
