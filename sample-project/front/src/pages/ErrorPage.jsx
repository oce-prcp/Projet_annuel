import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './ErrorPage.css';


const ErrorPage = () => {
    return (
        <>
            <Container className="error-bloc text-center" style={{ padding: '50px 0' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#038A8A' }}>Erreur 401</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    Vous n'êtes pas autorisé à accéder à cette page.
                </p>
                <Button 
                    variant="primary" 
                    href="/" 
                    style={{ padding: '10px 20px', fontSize: '1.2rem', backgroundColor: '#038A8A', border: 'none' }}
                >
                    Retour à l'accueil
                </Button>
            </Container>
        </>
    );
};

export default ErrorPage;
