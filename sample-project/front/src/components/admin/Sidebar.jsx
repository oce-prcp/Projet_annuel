import React from 'react';

const Sidebar = ({ activeView, setActiveView, userCount, fileCount }) => {
    return (
        <div className="sidebar">
            <button className={`sidebar-button ${activeView === 'users' ? 'active' : ''}`} onClick={() => setActiveView('users')}>
                Utilisateurs ({userCount})
            </button>
            <button className={`sidebar-button ${activeView === 'files' ? 'active' : ''}`} onClick={() => setActiveView('files')}>
                Fichiers ({fileCount})
            </button>
        </div>
    );
};

export default Sidebar;
