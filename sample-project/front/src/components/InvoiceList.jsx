import React, {userState, useEffect} from "react";
import { Card, Button } from "react-bootstrap";
import InvoiceCard from "./InvoiceCard";
import axios from "axios";





const InvoiceList = () => {
    const [userId, setUserId] = userState(null);
    const [userName, setUserName] = userState('');
    const [userAddress, setUserAddress] = userState('');
    const [userDate, setUserDate] = userState('');
    const [invoicesId, setInvoicesId] = userState([]);

    useEffect(() => {
        // Fonction pour récupérer l'ID utilisateur après le montage du composant
        const fetchUserId = async () => {
            try {
                const response = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
                setUserId(response.data.userId);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'ID utilisateur:', error);
            }
        };

        fetchUserId();
    }, []);

    const getInvoice = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/invoice/getAll/${userId}`, { withCredentials: true });
            console.log(response.data);
            /*setUserDate(response.data.createdAt);
            setInvoicesId(response.data);*/
        } catch (error) {
            console.error(error);
        }
        try {
            const responseUser = await axios.get(`http://localhost:8000/user/getUser/${userId}`, { withCredentials: true });
            console.log(responseUser.data);
            setUserName(responseUser.data.name);
            setUserAddress(responseUser.data.adress);
        }
    };

    return (
        <Card>
        <Card.Header>Liste des factures</Card.Header>
        <Card.Body>
            
        </Card.Body>
        </Card>
    );
}

export default InvoiceList;