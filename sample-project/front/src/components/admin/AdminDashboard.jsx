// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

import StatsOverview from './StatsOverview';
import Sidebar from './Sidebar';
import UserList from './UserList';
import FileList from './FileList';
import FileModal from './FileModal';
import UserModal from './UserModal';
import SearchBar from './SearchBar';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [totalStorage, setTotalStorage] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalStorageUsed, setTotalStorageUsed] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalFiles, setTotalFiles] = useState(0);
    const [filesUploadedToday, setFilesUploadedToday] = useState(0);
    const [users, setUsers] = useState([]);
    const [files, setFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFileType, setSelectedFileType] = useState('All');
    const [activeView, setActiveView] = useState('users');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [showModal, setShowModal] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userFileCount, setUserFileCount] = useState(0);
    const [userStorageUsed, setUserStorageUsed] = useState(0);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);

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
            fetchUserDetailsLog(userId);
        } catch (error) {
            navigate('/');
        }
    };

    const fetchUserDetailsLog = async (userId) => {
        try {
            const userDetailResponse = await axios.get(`http://localhost:8000/user/get/${userId}`, { withCredentials: true });
            const userRole = userDetailResponse.data.user_type;
            if (userRole !== 'admin') {
                navigate('/');
            } else {
                fetchAdminStats();
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
            navigate('/');
        }
    };

    const fetchAdminStats = async () => {
        try {
            const subscriptionStatsResponse = await axios.get('http://localhost:8000/subscription/stats', { withCredentials: true });
            setTotalStorage(subscriptionStatsResponse.data.totalStorage);
            setTotalRevenue(subscriptionStatsResponse.data.totalRevenue);

            const storageResponse = await axios.get('http://localhost:8000/user/storage/total', { withCredentials: true });
            setTotalStorageUsed(storageResponse.data.totalStorageUsed);

            const userCountResponse = await axios.get('http://localhost:8000/user/stats/count', { withCredentials: true });
            setTotalUsers(userCountResponse.data.totalUsers);

            const fileCountResponse = await axios.get('http://localhost:8000/files/stats/allFiles', { withCredentials: true });
            setTotalFiles(fileCountResponse.data.totalFiles);

            const filesTodayResponse = await axios.get('http://localhost:8000/files/stats/today', { withCredentials: true });
            setFilesUploadedToday(filesTodayResponse.data.filesUploadedToday);

            const usersResponse = await axios.get('http://localhost:8000/user/getall', { withCredentials: true });
            setUsers(usersResponse.data);

            const filesResponse = await axios.get('http://localhost:8000/files/all', { withCredentials: true });
            setFiles(filesResponse.data);
        } catch (error) {
            console.error('Error fetching admin stats:', error);
        }
    };

    const handleDelete = async (fileId) => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/files/${fileId}`, { withCredentials: true });
                setFiles(prevFiles => prevFiles.filter(file => file.file_id !== fileId));
                const fileToDelete = files.find(file => file.file_id === fileId);
                const updatedStorageUsed = totalStorageUsed - fileToDelete.file_size;
                setTotalStorageUsed(updatedStorageUsed);    
            } catch (error) {
                console.error('Erreur lors de la suppression du fichier:', error);
            }
        }
    };

    const handleDownload = (fileId) => {
        const confirmDownload = window.confirm("Êtes-vous sûr de vouloir télécharger ce fichier ?");
        if (confirmDownload) {
            window.open(`http://localhost:8000/files/download/${fileId}`, { withCredentials: true }, '_blank');
        }
    };

    const handleViewFile = (fileId, format) => {
        const fileCategory = format.split("/")[0];
        if (fileCategory === 'application' && format !== "application/pdf") {
            alert("Unable to open this file");
            return;
        }
        
        if (fileCategory === 'autres') {
            alert("Unable to open this file");
            return;
        }

        setIframeSrc(`http://localhost:8000/files/see/${fileId}`, { withCredentials: true });
        setShowModal(true);
    };

    const fetchUserDetails = async (userId) => {
        try {
            const userDetailResponse = await axios.get(`http://localhost:8000/user/get/${userId}`, { withCredentials: true });
            const userFileCountResponse = await axios.get(`http://localhost:8000/files/stats/count/${userId}`, { withCredentials: true });
            
            let subscriptionDetails = null;    
            try {
                const subscriptionResponse = await axios.get(`http://localhost:8000/subscription/get/${userId}`, { withCredentials: true });
                subscriptionDetails = subscriptionResponse.data; 
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    subscriptionDetails = null;
                } else {
                    throw error; 
                }
            }
            setSelectedUser(userDetailResponse.data);
            setUserFileCount(userFileCountResponse.data.totalFiles);
            setUserStorageUsed(userDetailResponse.data.user_storage_space_used);
            setSubscriptionDetails(subscriptionDetails);
            setShowUserModal(true);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <StatsOverview
                totalStorage={totalStorage}
                totalRevenue={totalRevenue}
                totalStorageUsed={totalStorageUsed}
                totalUsers={totalUsers}
                totalFiles={totalFiles}
                filesUploadedToday={filesUploadedToday}
            />
            <Sidebar activeView={activeView} setActiveView={setActiveView} userCount={users.length} fileCount={files.length} />
            
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedFileType={selectedFileType}
                setSelectedFileType={setSelectedFileType}
                showFilter={activeView === 'files'}
            />

            {activeView === 'users' ? (
                <UserList users={users} searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchUserDetails={fetchUserDetails} />
            ) : (
                <FileList
                    files={files}
                    users={users}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedFileType={selectedFileType}
                    setSelectedFileType={setSelectedFileType}
                    sortConfig={sortConfig}
                    setSortConfig={setSortConfig}
                    handleViewFile={handleViewFile}
                    handleDelete={handleDelete}
                    handleDownload={handleDownload}
                />
            )}
            {showModal && <FileModal iframeSrc={iframeSrc} setShowModal={setShowModal} />}
            {showUserModal && selectedUser && (
                <UserModal
                    selectedUser={selectedUser}
                    userFileCount={userFileCount}
                    userStorageUsed={userStorageUsed}
                    subscriptionDetails={subscriptionDetails}
                    setShowUserModal={setShowUserModal}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
