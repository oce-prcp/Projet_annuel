import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../img/logo_data-save.png';
import logoScrolled from '../../img/logo-datasave.png';
import footerLogo from '../../img/logo_datasave.png';

const LoginPage = () => {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [phone, setPhone] = useState('');
    const [adress, setAdress] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [navbarColor, setNavbarColor] = useState('transparent');
    const [logoImage, setLogoImage] = useState(logo);
    const [textColor, setTextColor] = useState('black');

    const changeNavbarColorAndLogo = () => {
        if (window.scrollY >= 80) {
            setNavbarColor('#0a242e');
            setLogoImage(logoScrolled);
            setTextColor('white');
        } else {
            setNavbarColor('transparent');
            setLogoImage(logo);
            setTextColor('black');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNavbarColorAndLogo);
        return () => {
            window.removeEventListener('scroll', changeNavbarColorAndLogo);
        };
    }, []);

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
            if (userId){
                const subscriptionResponse = await axios.get(`http://localhost:8000/subscription/get/${userId}`, { withCredentials: true });
                if (subscriptionResponse.status === 200) {
                    window.location.href = '/';
                } else {
                    window.location.href = '/subscription';
                }
            }

        } catch (error) {
            alert('Erreur lors de la connexion.' + error);
        }
    }

    const handleSignUp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:8000/user/signup', 
                { email: userEmail, password: password, name: name, firstname: firstname, phone: phone, adress: adress }, { withCredentials: true }
            );
            console.log(response.data);
            alert('Compte créé avec succès, veuillez vous connecter.');
            setIsSignUp(false);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la création du compte.' + error);
        }
    };

    return (
        <>
            <header className="fixed-top" style={{ backgroundColor: navbarColor, transition: 'background-color 0.5s ease' }}>
                <nav className="navbar navbar-expand-lg" style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <a className="navbar-brand" href="/">
                            <img src={logoImage} alt="Logo" style={{ width: '100px' }} />
                        </a>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/" style={{ color: textColor }}>Pourquoi Data Save ?</a>
                                </li>   
                            </ul>
                            <a className="btn btn-outline-light" href="/login" style={{ backgroundColor: '#038A8A', color: 'white'}}>
                                Se connecter
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Card style={{ width: '30rem' }} className="p-4">
                    <h2>{isSignUp ? 'Créer un compte' : 'Se connecter'}</h2>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email :</Form.Label>
                            <Form.Control
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password :</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        {isSignUp ? (
                            <>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Nom :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicFirstname">
                                    <Form.Label>Prénom :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPhone">
                                    <Form.Label>Téléphone :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicAdress">
                                    <Form.Label>Adresse :</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={adress}
                                        onChange={(e) => setAdress(e.target.value)}
                                    />
                                </Form.Group>
                            </>
                        ) : ("") }
                        {isSignUp ? (
                            <Button variant="primary" type="button" onClick={handleSignUp} className='mt-3' style={{ backgroundColor: '#038A8A', color: 'white', borderColor: '#038A8A' }}>
                                Créer un compte
                            </Button>
                        ) : (
                            <Button variant="primary" type="button" onClick={handleLogin} className='mt-3' style={{ backgroundColor: '#038A8A', color: 'white', borderColor: '#038A8A' }}>
                                Se connecter
                            </Button>
                        )}
                    </Form>
                    
                    <div className="mt-3" >
                        {isSignUp ? (
                            <p>
                                Vous avez déjà un compte ?<Button variant="link" onClick={() => setIsSignUp(false)} style={{ color: 'black' }}>Se connecter</Button>
                            </p>
                        ) : (
                            <p>
                                Pas de compte ? <Button variant="link" onClick={() => setIsSignUp(true)} style={{ color: 'black' }}>Créer un compte</Button>
                            </p>
                        )}
                    </div>
                </Card>
            </Container>
             {/* Footer Section */}
             <footer id="contact" className="footer" style={{ backgroundColor: '#0a242e', color: 'white', padding: '30px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 d-flex align-items-start">
                            <img src={footerLogo} alt="Footer Logo" style={{ width: '50px', marginRight: '10px' }} />
                            <div>
                                <h5>Coordonnées</h5>
                                <p>1337 Bachelor IPSSI <br />12e Paris</p>
                                <p>01 02 03 04 <br />contact@datasave.com</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h5>Navigation</h5>
                            <ul className="list-unstyled">
                                <li><a href="#" style={{ color: 'white', textDecoration: 'none' }}>Accueil</a></li>
                                <li><a href="#solutions" style={{ color: 'white', textDecoration: 'none' }}>Solutions</a></li>
                                <li><a href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5>Localisation</h5>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9997921104365!2d2.2944813156749285!3d48.85837007928762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66ef62df7bced%3A0x8c7f15d3d26364df!2sEiffel%20Tower%2C%20Paris%2C%20France!5e0!3m2!1sen!2sus!4v1642932215287!5m2!1sen!2sus"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                title="Google Maps Location"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Footer secondaire en noir */}
            <footer className="footer" style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <p>
                                Copyright © 2024 - 2025 - Tous droits réservés. 
                                <a href="#" style={{ color: '#038A8A', textDecoration: 'none' }}> Mentions légales</a> / 
                                <a href="#" style={{ color: '#038A8A', textDecoration: 'none' }}> DataSave</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};


export default LoginPage;
