import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import InvoiceCard from "./InvoiceCard";
import axios from "axios";

const InvoiceList = () => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
                const userId = userResponse.data.userId;
                setUserId(userId);

                const responseUser = await axios.get(`http://localhost:8000/user/get/${userId}`, { withCredentials: true });
                setUserName(responseUser.data.user_name);
                setUserFirstName(responseUser.data.user_first_name);
                setUserAddress(responseUser.data.user_address);

                const invoiceResponse = await axios.get(`http://localhost:8000/invoice/getAll/${userId}`, { withCredentials: true });
                setInvoices(invoiceResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchUserData();
    }, []);

    if (userId) {
        return <p>Chargement en cours...</p>;
    }

    return (
        <Card>
            <Card.Header>Liste des factures</Card.Header>
            <Card.Body className="d-flex" style={{ gap: '1%' }}>
                {invoices.length > 0 ? (
                    invoices.map((invoice) => (
                        <InvoiceCard
                            key={invoice.invoice_id}
                            invoiceId={invoice.invoice_id}
                            userId={userId}
                            userName={userName}
                            userFirstName={userFirstName}
                            userAddress={userAddress}
                            invoiceDate={invoice.createdAt}
                        />
                    ))
                ) : (
                    <p>Aucune facture trouvée.</p>
                )}
            </Card.Body>
        </Card>
    );
}

export default InvoiceList;