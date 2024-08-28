import React from 'react';
import  { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState(''); // Changer email en userEmail
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/user/login', { email: userEmail, password: password }); // Changer email en user_email
            // Succès login
            console.log(response.data);
            sessionStorage.setItem('userData', JSON.stringify(response.data));
            console.log('sessionStorage', sessionStorage.getItem('userData'));  
            //window.location.href = '/'; 
        } catch (error) {
            // Erreur login
            console.error(error);
            alert('Email ou mot de passe incorrect');
        }
    };

    return (
        <Container className="d-flex justify-content-center mt-5 mb-5">
            <Card style={{ width: '30rem' }} className="p-4">
                <h2>Login</h2>
                
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={userEmail} // Changer email en userEmail
                            onChange={(e) => setUserEmail(e.target.value)} // Changer email en userEmail
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={handleLogin} className='mt-3'>
                        Login
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default LoginPage;