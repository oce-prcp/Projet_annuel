import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const AccountDelete = () => {
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

    const handleDeleteAccount = async () => {
        try {
            const response = await axios.delete(`http://localhost:8000/user/delete/${userId}`);
            console.log('Compte supprimé:', response.data);

        } catch (error) {
            console.error('Erreur lors de la suppression du compte:', error);
        }
    }
    
    
    return(
        <>
            <Button onClick={handleDeleteAccount} variant="danger">Supprimer le compte</Button>
        </>
    );
};

export default AccountDelete;