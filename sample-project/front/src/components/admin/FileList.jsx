import React from 'react';


const FileList = ({ files, users, searchTerm, setSearchTerm, selectedFileType, setSelectedFileType, sortConfig, setSortConfig, handleViewFile, handleDelete, handleDownload }) => {
    
    const getFileTypeCategory = (mimeType) => {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType.startsWith('audio/')) return 'audio';
        if (mimeType === 'application/pdf') return 'pdf';
        if (mimeType.startsWith('text/')) return 'text';
        return 'autres';
    };
    
    const filteredFiles = files.filter(file =>
        file.file_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFileType === 'All' || getFileTypeCategory(file.file_format) === selectedFileType)
    );

    const sortedFiles = React.useMemo(() => {
        let sortableFiles = [...filteredFiles];
        if (sortConfig.key !== null) {
            sortableFiles.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableFiles;
    }, [filteredFiles, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

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

    return (
        <div className="file-list-section">
            <h2 className="dashboard-title">Fichiers ({sortedFiles.length})</h2>
            <div className="file-list-header">
                <button className="file-list-button" onClick={() => handleSort('file_name')}>Nom</button>
                <button className="file-list-button" onClick={() => handleSort('file_date')}>Date d'ajout</button>
                <button className="file-list-button" onClick={() => handleSort('file_size')}>Taille</button>
                <button className="file-list-button" onClick={() => handleSort('user_name')}>Propriétaire</button>
                <span className="file-list-header-action">Actions</span>
            </div>
            <div className="file-list">
                {sortedFiles.map((file) => (
                    <div className="file-card" key={file.file_id}>
                        <img src={getFileIcon(file.file_format)} alt="file" className="file-icon" />
                        <span className="file-name" onClick={() => handleViewFile(file.file_id, file.file_format)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                            {file.file_name}
                        </span>
                        <span className="file-date">{new Date(file.file_date).toLocaleString()}</span>
                        <span className="file-size">{(file.file_size / 1048576).toFixed(2)} Mo</span>
                        <span className="file-owner">{users.find(user => user.user_id === file.user_id)?.user_name}</span>
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
                ))}
            </div>
        </div>
    );
};

export default FileList;