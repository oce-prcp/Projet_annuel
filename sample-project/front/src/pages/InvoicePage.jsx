import React, { useEffect, useState } from 'react';
import ErrorPage from './ErrorPage';
import InvoiceList from '../components/InvoiceList';
import axios from 'axios';
import './AccountPage.css';

const InvoicePage = () => {

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

    if (!userId) {
        return(
            <>
                <ErrorPage />
            </>
        )   
    }
    else {
        return (
            <>
                <InvoiceList />
            </>
        );
    }
};

export default InvoicePage;
