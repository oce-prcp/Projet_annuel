import React from 'react';
import InvoiceList from '../components/InvoiceList';
import AccountDelete from '../components/AccountDelete';

const AccountPage = () => {
    return (
        <>
            <InvoiceList />
            <AccountDelete />
        </>
    );
};

export default AccountPage;
