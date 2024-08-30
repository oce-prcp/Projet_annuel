import React from 'react';
import InvoiceList from '../components/InvoiceList';
import { Button } from 'react-bootstrap';
import AccountDelete from '../components/AccountDelete';
import Cookies from 'js-cookie';

const AccountPage = () => {

    const logout = async () => {
        Cookies.remove('auth_token', {path: '/', domain: 'localhost'});
        window.location.href = '/login';
    };

    
    return (
        <>
            <InvoiceList />
            <AccountDelete />
            <Button onClick={logout} variant="danger">Déconnexion</Button>
        </>
    );
};

export default AccountPage;
