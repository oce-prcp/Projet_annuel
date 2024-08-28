import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [phone, setPhone] = useState('');
    const [isSignUp, setIsSignUp] = useState(false); // État pour gérer la vue (connexion ou inscription)
    /*const [userId, setUserId] = useState(null);
    const getUserId = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/getId', { withCredentials: true });
            console.log(response.data);
            setUserId(response.data.userId);
        } catch (error) {
            console.error(error);
        }
    };*/
    
    const handleLogin = async () => {
        try {
            // Effectuer la connexion
            const loginResponse = await axios.post(
                'http://localhost:8000/user/login', 
                { email: userEmail, password: password }, 
                { withCredentials: true }
            );
            console.log('Login successful:', loginResponse.data);

            const userIdResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
            const userId = userIdResponse.data.userId;
            console.log('User ID:', userId);

            if (userId) {
                const subscriptionResponse = await axios.post(
                    'http://localhost:8000/subscription/create', 
                    { user_id: userId, storage: 20, price: 20, date: new Date() }
                );
                console.log('Subscription created:', subscriptionResponse.data);
            } else {
                console.error('User ID not found after login.');
            }
        } catch (error) {
            console.error('Error during login or subscription creation:', error);
            alert('Email ou mot de passe incorrect');
        }
    };

    const handleSignUp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/user/signup', 
                { email: userEmail, password: password, name: name, firstname: firstname, phone: phone }
            );
            console.log(response.data);
            alert('Compte créé avec succès, veuillez vous connecter.');
            setIsSignUp(false);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la création du compte.');
        }
    };


    return (
        <Container className="d-flex justify-content-center mt-5 mb-5">
            <Card style={{ width: '30rem' }} className="p-4">
                <h2>{isSignUp ? 'Créer un compte' : 'Se connecter'}</h2>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
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
                    { isSignUp ? (
                            <>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Nom:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicFirstname">
                                    <Form.Label>Prénom:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone">
                                    <Form.Label>Téléphone:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group>
                            </>
                    ) : ("") }
                    {isSignUp ? (
                        <Button variant="primary" type="button" onClick={handleSignUp} className='mt-3'>
                            Créer un compte
                        </Button>
                    ) : (
                        <Button variant="primary" type="button" onClick={handleLogin} className='mt-3'>
                            Se connecter
                        </Button>
                    )}
                </Form>
                
                <div className="mt-3">
                    {isSignUp ? (
                        <p>
                            Vous avez déjà un compte ?<Button variant="link" onClick={() => setIsSignUp(false)}>Se connecter</Button>
                        </p>
                    ) : (
                        <p>
                            Pas de compte ? <Button variant="link" onClick={() => setIsSignUp(true)}>Créer un compte</Button>
                        </p>
                    )}
                </div>
            </Card>
        </Container>
    );
};

export default LoginPage;