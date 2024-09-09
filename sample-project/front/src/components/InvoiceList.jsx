import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import InvoiceCard from "./InvoiceCard";
import AccountDelete from '../components/AccountDelete';
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


        return (
            <>
                <Card className="invoice-section">
                    <h2 className="invoice-title">Liste des factures</h2>
                    <Card.Body>
                        {invoices.length > 0 ? (
                            <Table striped hover responsive>
                                <thead>
                                    <tr className="invoice-list-header">
                                        <th>ID de la Facture</th>
                                        <th>Date</th>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                        <th>Adresse</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="invoice-item"> 
                                    {invoices.map((invoice) => (
                                        <InvoiceCard
                                            key={invoice.invoice_id}
                                            invoiceId={invoice.invoice_id}
                                            userId={userId}
                                            userName={userName}
                                            userFirstName={userFirstName}
                                            userAddress={userAddress}
                                            invoiceDate={invoice.createdAt}
                                        />
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>Aucune facture trouvée.</p>
                        )}
                    </Card.Body>
                    <div className="account-delete">
                        <AccountDelete />
                    </div>
                </Card>
            </>
        );
    };
    
    
export default InvoiceList