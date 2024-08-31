import React, { useEffect, useState } from 'react';
import InvoiceList from '../components/InvoiceList';
import { Button } from 'react-bootstrap';
import AccountDelete from '../components/AccountDelete';
import Cookies from 'js-cookie';
import axios from 'axios';

const AccountPage = () => {

    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
                const userId = userResponse.data.userId;
                setUserId(userId);
            }catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        }
        fetchUserData();
    }, []);

    const logout = async () => {
        Cookies.remove('auth_token', {path: '/', domain: 'localhost'});
        window.location.href = '/login';
    };

    if (!userId) {
        return <p>Chargement en cours...</p>;
    }
    else {
        return (
            <>
                <InvoiceList />
                <AccountDelete />
                <Button onClick={logout} variant="danger">Déconnexion</Button>
            </>
        );
    }
};

export default AccountPage;
