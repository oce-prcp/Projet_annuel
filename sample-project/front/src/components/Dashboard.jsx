import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';
import SubscriptionInfo from './SubscriptionInfo';
import FileList from './FileList';
import UploadModal from './UploadModal';
import SearchFilterBar from './SearchFilterBar';
import './Dashboard.css';

const Dashboard = () => {
    const [userId, setUserId] = useState(null);
    const [files, setFiles] = useState([]);
    const [subscription, setSubscription] = useState({});
    const [storageUsed, setStorageUsed] = useState(0);
    const [storageLimit, setStorageLimit] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [subscriptionError, setSubscriptionError] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFileType, setSelectedFileType] = useState('All');
    const [userRole, setUserRole] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchUserId();
    }, []);

    const fetchUserId = async () => {
        try {
            const userResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
            const userId = userResponse.data.userId;
            if (!userId) {
                throw new Error('User ID not found');
            }
            setUserId(userId);
            fetchData(userId);
        } catch (error) {
            navigate('/');
        }
    };

    const fetchData = async (userId) => {
        try {
            const subscriptionResponse = await axios.get(`http://localhost:8000/subscription/get/${userId}`, { withCredentials: true });
            setSubscription(subscriptionResponse.data);
            setStorageLimit(subscriptionResponse.data.subscription_storage_space);

            const fileResponse = await axios.get(`http://localhost:8000/files/user/${userId}`, { withCredentials: true });
            setFiles(fileResponse.data);

            const userDetailsResponse = await axios.get(`http://localhost:8000/user/get/${userId}`, { withCredentials: true });
            setUserRole(userDetailsResponse.data.user_type);
            console.log(userDetailsResponse.data.user_type);
            setStorageUsed(userDetailsResponse.data.user_storage_space_used);

        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            if (error.response && error.response.status === 401) {
                setSubscriptionError(true);
            }
        }
    };

    const getFileTypeCategory = (mimeType) => {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType.startsWith('audio/')) return 'audio';
        if (mimeType === 'application/pdf') return 'pdf';
        if (mimeType.startsWith('text/')) return 'text';
        return 'autres';
    };

    const bytesToGigabytes = (bytes) => (bytes / 1073741824).toFixed(2);

    const storageUsedInGB = bytesToGigabytes(storageUsed);
    const storageLimitInGB = bytesToGigabytes(storageLimit);

    const storagePercentage = storageLimit > 0 ? Math.min((storageUsed / storageLimit) * 100, 100) : 0;
    // const storagePercentage = 80;
    
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedFiles = React.useMemo(() => {
        let sortableFiles = [...files];
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
    }, [files, sortConfig]);

    const filteredFiles = sortedFiles.filter(file => 
        file.file_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedFileType === 'All' || getFileTypeCategory(file.file_format) === selectedFileType)
    );

    const handleDelete = async (fileId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/files/${fileId}`, { withCredentials: true });
                setFiles(prevFiles => prevFiles.filter(file => file.file_id !== fileId));
                const updatedStorageUsed = storageUsed - files.find(file => file.file_id === fileId).file_size;
                setStorageUsed(updatedStorageUsed);
            } catch (error) {
                console.error('Erreur lors de la suppression du fichier:', error);
            }
        }
    };

    const handleDownload = (fileId) => {
        const confirmDownload = window.confirm("Êtes-vous sûr de vouloir télécharger ce fichier ?");
        if (confirmDownload) {
            window.open(`http://localhost:8000/files/download/${fileId}`, { withCredentials: true });
        }
    };

    const handleView = (fileId) => {
        window.open(`http://localhost:8000/files/see/${fileId}`, { withCredentials: true });
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
                }, { withCredentials: true });

                await fetchUserId(); 
                setShowModal(false); 
                console.log('Fichier téléchargé avec succès:', response.data.message);
            } catch (error) {
                console.error('Erreur lors du téléchargement du fichier:', error);
            }
        }
    };

    const handleSubscriptionRedirect = () => {
        navigate('/subscription');
    };

    const handleAdminRedirect = () => {
        navigate('/admin');
    };

    return (
        <div className="dashboard">
            {subscriptionError ? (
                <div className="subscription-error-overlay">
                    <div className="subscription-error-popup">
                        <h2>Vous n'avez pas d'abonnement actif</h2>
                        <p>Pour accéder à toutes les fonctionnalités, veuillez acheter un abonnement.</p>
                        <Button onClick={() => navigate('/subscription')}>Acheter du stockage</Button>
                        <Button variant="secondary" onClick={() => navigate('/')}>Retour à l'accueil</Button>
                    </div>
                </div>
            ) : (
                <>
                    <SubscriptionInfo 
                        storageLimitInGB={storageLimitInGB}
                        storageUsedInGB={storageUsedInGB}
                        storagePercentage={storagePercentage}
                        handleSubscriptionRedirect={handleSubscriptionRedirect}
                    />

                    <SearchFilterBar setSearchTerm={setSearchTerm} setSelectedFileType={setSelectedFileType} />

                    <FileList 
                        filteredFiles={filteredFiles}
                        handleSort={handleSort}
                        handleDelete={handleDelete}
                        handleDownload={handleDownload}
                        handleView={handleView}
                    />

                    <div className="action-buttons-container">
                        <button className="add-file-button" onClick={handleShowModal}>+</button>
                        {userRole === 'admin' && (
                            <button className="add-file-button" onClick={handleAdminRedirect}>😎</button>
                        )}
                    </div>

                    <UploadModal showModal={showModal} handleCloseModal={handleCloseModal} handleFileUpload={handleFileUpload} />
                </>
            )}
        </div>
    );
};

export default Dashboard;