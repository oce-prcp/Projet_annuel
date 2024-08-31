import React from 'react';

const UserList = ({ users, searchTerm, setSearchTerm, fetchUserDetails }) => {
    const filteredUsers = users.filter(user =>
        (user.user_name.toLowerCase() + " " + user.user_first_name.toLowerCase()).includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-list-section">
            <h2 className="dashboard-title">Liste des utilisateurs ({filteredUsers.length})</h2>
            <div className="file-list-header">
                <span className="file-list-button">Nom</span>
                <span className="file-list-button">Email</span>
                <span className="file-list-button">Rôle</span>
                <span className="file-list-header-action">Actions</span>
            </div>
            <div className="file-list">
                {filteredUsers.map((user) => (
                    <div className="file-card" key={user.user_id}>
                        <span className="file-name">{user.user_name} {user.user_first_name}</span>
                        <span className="file-date">{user.user_email}</span>
                        <span className="file-size">{user.user_type}</span>
                        <span className="file-actions">
                            <button className="view-more-button" onClick={() => fetchUserDetails(user.user_id)}>Voir plus</button>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
