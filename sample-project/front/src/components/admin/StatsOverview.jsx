import React from 'react';

const StatsOverview = ({ totalStorage, totalRevenue, totalStorageUsed, totalUsers, totalFiles, filesUploadedToday }) => {
    const formatRevenue = (revenue) => {
        return `${parseFloat(revenue).toFixed(2)} €`;
    };

    const calculateStoragePercentage = (used, total) => {
        return total ? ((used / total) * 100).toFixed(2) : 0;
    };

    return (
        <div className="stats-overview">
            <div className="stats-box">
                <h3>Total des Go vendus</h3>
                <p>{(totalStorage / 1073741824).toFixed(2)} Go</p>
            </div>
            <div className="stats-box">
                <h3>Chiffre d'affaires</h3>
                <p>{formatRevenue(totalRevenue)}</p>
            </div>
            <div className="stats-box">
                <h3>Stockage total utilisé</h3>
                <p>{(totalStorageUsed / 1073741824).toFixed(2)} Go</p>
            </div>
            <div className="stats-box">
                <h3>Utilisation du Stockage</h3>
                <div className="pourcentageDiv">
                    <span className="storage-indicator" style={{ backgroundColor: '#328000' }}></span>
                    <p><strong>{calculateStoragePercentage(totalStorageUsed, totalStorage)}%</strong></p>
                </div>
            </div>
            <div className="stats-box">
                <h3>Nombre d'utilisateurs</h3>
                <p>{totalUsers}</p>
            </div>
            <div className="stats-box">
                <h3>Nombre de fichiers</h3>
                <p>{totalFiles}</p>
            </div>
            <div className="stats-box">
                <h3>Fichiers uploadés aujourd'hui</h3>
                <p>{filesUploadedToday}</p>
            </div>
        </div>
    );
};

export default StatsOverview;
