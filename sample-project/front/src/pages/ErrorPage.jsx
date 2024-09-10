import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './ErrorPage.css';


const ErrorPage = () => {
    return (
        <>
            <Container className="error-bloc text-center" style={{ padding: '50px 0' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#038A8A' }}>Erreur</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
                    Vous n'êtes pas connecter pour accéder à cette page.
                </p>
                <Button 
                    variant="primary" 
                    href="/login" 
                    style={{ padding: '10px 20px', fontSize: '1.2rem', backgroundColor: '#038A8A', border: 'none' }}
                >
                    Se connecter ou créer un compte
                </Button>
            </Container>
        </>
    );
};

export default ErrorPage;
