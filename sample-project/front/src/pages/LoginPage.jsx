import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

    const validateName = (name) => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name);

    const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

    const handleValidation = () => {
        const newErrors = {};
        
        if (!validateEmail(userEmail)) {
            newErrors.userEmail = 'Email invalide';
        }
        
        if (!validatePassword(password)) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre.';
        }
        
        if (isSignUp) {
            if (!validateName(name)) {
                newErrors.name = 'Nom invalide';
            }

            if (!validateName(firstname)) {
                newErrors.firstname = 'Prénom invalide';
            }

            if (!validatePhone(phone)) {
                newErrors.phone = 'Numéro de téléphone invalide (10 chiffres requis)';
            }

            if (!adress) {
                newErrors.adress = 'Adresse invalide';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
   
    const handleLogin = async () => {
        try {
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
                const subscriptionResponse = await axios.get(`http://localhost:8000/subscription/get/${userId}`, { withCredentials: true });
                if (subscriptionResponse.status === 200) {
                    window.location.href = '/';
                } else {
                    alert('Vous n\'avez pas d\'abonnement en cours. Veuillez vous abonner.');
                    window.location.href = '/subscription';
                }
            }

        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
            alert('Erreur lors de la connexion. Veuillez vérifier vos informations et réessayer.');
        }
    }

    const handleSignUp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/user/signup', 
                { email: userEmail, password: password, name: name, firstname: firstname, phone: phone, adress: adress }, 
                { withCredentials: true }
            );
            console.log('Account created:', response.data);
            alert('Compte créé avec succès, veuillez vous connecter.');
            setIsSignUp(false);
        } catch (error) {
            console.error('Erreur lors de la création du compte:', error);
            alert('Erreur lors de la création du compte. Veuillez réessayer.');
        }
    };

    const handleSubmit = () => {
        if (handleValidation()) {
            if (isSignUp) {
                handleSignUp();
            } else {
                handleLogin();
            }
        }
    }

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
                            isInvalid={!!errors.userEmail}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.userEmail}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    {isSignUp && (
                        <>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Nom:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicFirstname">
                                <Form.Label>Prénom:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    isInvalid={!!errors.firstname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstname}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label>Téléphone:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    isInvalid={!!errors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formBasicAdress">
                                <Form.Label>Adresse:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={adress}
                                    onChange={(e) => setAdress(e.target.value)}
                                    isInvalid={!!errors.adress}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.adress}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </>
                    )}
                    <Button variant="primary" type="button" onClick={handleSubmit} className='mt-3'>
                        {isSignUp ? 'Créer un compte' : 'Se connecter'}
                    </Button>
                </Form>
                
                <div className="mt-3">
                    {isSignUp ? (
                        <p>
                            Vous avez déjà un compte ? <Button variant="link" onClick={() => setIsSignUp(false)}>Se connecter</Button>
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
