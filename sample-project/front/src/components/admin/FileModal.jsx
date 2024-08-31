import React from 'react';

const FileModal = ({ iframeSrc, setShowModal }) => {
    return (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <iframe src={iframeSrc} title="File Viewer" className="file-viewer"></iframe>
                <button className="modal-close-button" onClick={() => setShowModal(false)}>x</button>
            </div>
        </div>
    );
};

export default FileModal;
