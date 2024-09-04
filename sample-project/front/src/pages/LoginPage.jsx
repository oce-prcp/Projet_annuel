/*import React, { useState, useEffect } from 'react';
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

*/

import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button,Row, Col } from 'react-bootstrap';
import axios from 'axios';
import logo from '../../img/logo_data-save.png';
import logoScrolled from '../../img/logo-datasave.png';
import footerLogo from '../../img/logo_datasave.png';
import './LoginPage.css'

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
    const [errors, setErrors] = useState({});

    // Validation functions
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

    // Navbar color change on scroll
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
        if (handleValidation()) {
            try {
                const loginResponse = await axios.post('http://localhost:8000/user/login', { email: userEmail, password }, { withCredentials: true });
                const userIdResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
                const userId = userIdResponse.data.userId;
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
                alert('Erreur lors de la connexion. Veuillez vérifier vos informations et réessayer.');
            }
        }
    };

    const handleSignUp = async () => {
        if (handleValidation()) {
            try {
                const response = await axios.post('http://localhost:8000/user/signup', { email: userEmail, password, name, firstname, phone, adress }, { withCredentials: true });
                alert('Compte créé avec succès, veuillez vous connecter.');
                setIsSignUp(false);
            } catch (error) {
                alert('Erreur lors de la création du compte. Veuillez réessayer.');
            }
        }
    };

    const handleSubmit = () => {
        if (isSignUp) {
            handleSignUp();
        } else {
            handleLogin();
        }
    };

    return (
        <>
            {/* Navbar */}
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
                            <a className="btn btn-outline-light" href="/login" style={{ backgroundColor: '#038A8A', color: 'white' }}>
                                Se connecter
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Form Container */}
            <Container className="d-flex justify-content-center mt-5 mb-5">
            <Row>
                    <Card style={{ width: '100%' }} className="p-4 d-flex justify-content-center align-items-center">
                        <h2 className='login-header'>Connectez-vous ou créez un compte</h2>
                        <p className='login-subheader'>Entrez votre adresse e-mail ou votre numéro de téléphone portable pour commencer. Si vous avez déjà un compte, nous le trouverons pour vous.</p>
                        <Container className="container-login">
                            <Form className='login-form'>
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
                                <Button variant="primary" type="button" onClick={handleSubmit} className='mt-3 login-button'>
                                    {isSignUp ? 'Créer un compte' : 'Se connecter'}
                                </Button>

                                <div className="mt-3">
                                    {isSignUp ? (
                                        <p>
                                            Déjà un compte ? <Button className="login-toggle" variant="link" onClick={() => setIsSignUp(false)}>Se connecter</Button>
                                        </p>
                                    ) : (
                                        <p>
                                            Pas de compte ? <Button className='login-toggle' variant="link" onClick={() => setIsSignUp(true)}>Créer un compte</Button>
                                        </p>
                                    )}
                                </div>
                            </Form>
                            
                            <Col md={6} className="d-flex">
                                <div className='d-flex flex-column align-items-center container-reassurance'>
                                    <h4 className='reassurance-header'>Pourquoi Data Save ?</h4>
                                    <ul className='login-reassurance'>
                                        <li>  
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.628 20.81a1.677 1.677 0 0 1-2.254-.694 1.64 1.64 0 0 1-.168-1.05l.835-4.82-3.537-3.414a1.642 1.642 0 0 1-.03-2.338c.256-.26.592-.43.955-.482l4.888-.704 2.186-4.386a1.677 1.677 0 0 1 2.994 0l2.186 4.386 4.887.704c.913.13 1.545.97 1.412 1.873-.052.36-.223.693-.486.947l-3.537 3.414.835 4.82c.156.9-.455 1.756-1.363 1.91a1.684 1.684 0 0 1-1.06-.166L12 18.534 7.628 20.81Zm3.595-4.362a1.683 1.683 0 0 1 1.554 0l3.632 1.89-.693-4.005a1.643 1.643 0 0 1 .48-1.463l2.938-2.837-4.06-.585a1.668 1.668 0 0 1-1.258-.904L12 4.899l-1.816 3.645a1.668 1.668 0 0 1-1.257.904l-4.062.585 2.94 2.837c.393.38.572.927.48 1.463l-.695 4.006 3.633-1.891Z" fill="#038A8A"></path></svg>
                                            <div>Recherche intelligente pour un accès rapide à vos fichiers </div>
                                        </li>
                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><g fill="#038A8A"><path d="M24 32a2 2 0 0 1-2-2v-4h-4a2 2 0 1 1 0-4h4v-4a2 2 0 1 1 4 0v4h4a2 2 0 1 1 0 4h-4v4a2 2 0 0 1-2 2Z"></path><path d="M30.522 7.694a9.224 9.224 0 0 0-13.044 0 5.224 5.224 0 0 1-4.96 1.374L8.83 8.146A2.279 2.279 0 0 0 6 10.357V26c0 9.941 8.059 18 18 18s18-8.059 18-18V10.357a2.279 2.279 0 0 0-2.831-2.21l-3.686.92a5.224 5.224 0 0 1-4.96-1.373Zm-10.216 2.828a5.224 5.224 0 0 1 7.388 0 9.224 9.224 0 0 0 8.759 2.426L38 12.562V26c0 7.732-6.268 14-14 14s-14-6.268-14-14V12.562l1.547.386a9.224 9.224 0 0 0 8.76-2.426Z"></path></g></svg>
                                            <div>Notifications instantanées pour l'achat d'espace et suppression de compte</div>
                                        </li>
                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.514 5.126a1 1 0 0 1 .972 0l7 3.889a1 1 0 0 1 .514.874V19a1 1 0 1 0 2 0V9.889a3 3 0 0 0-1.543-2.623l-7-3.888a3 3 0 0 0-2.914 0l-7 3.888A3 3 0 0 0 2 9.89V19a1 1 0 1 0 2 0V9.889a1 1 0 0 1 .514-.874l7-3.89ZM8 12v2h3v-2H8Zm-2-1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-4v-3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1Zm2 7v-2h3v2H8Zm5 0h3v-2h-3v2Z" fill="#038A8A"></path></svg>
                                            <div>Stockage sécurisé et fiable, fichiers téléchargeables à tout moment</div>
                                        </li>
                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="M17 2a1 1 0 0 1 1 1v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 2 0v1h8V3a1 1 0 0 1 1-1Zm3 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9Zm-9 6a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h4Zm6-4a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h10Zm2-6H5a1 1 0 0 0-1 1v1h16V7a1 1 0 0 0-1-1Z" fill="#038A8A"></path></svg>
                                            <div>Historique des versions pour suivre toutes les modifications de vos documents</div>
                                        </li>
                                        <li>
                                            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><g fill="#038A8A"><path d="M18 28a2 2 0 1 0-4 0v4a2 2 0 1 0 4 0v-4ZM34 28a2 2 0 1 0-4 0v4a2 2 0 1 0 4 0v-4Z"></path><path d="M9.857 7.257a2 2 0 0 0-3.714 1.486l3.916 9.788A17.956 17.956 0 0 0 4 32v2c0 5.523 4.477 10 10 10h20c5.523 0 10-4.477 10-10v-2c0-5.36-2.342-10.171-6.059-13.469l3.916-9.788a2 2 0 0 0-3.714-1.486l-3.566 8.914A17.92 17.92 0 0 0 26 14h-4a17.92 17.92 0 0 0-8.577 2.171L9.857 7.257ZM26 38a2 2 0 1 0-4 0v2h-8a6 6 0 0 1-6-6v-2c0-7.732 6.268-14 14-14h4c7.732 0 14 6.268 14 14v2a6 6 0 0 1-6 6h-8v-2Z"></path></g></svg>
                                            <div>Service client disponible 24/7</div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Container>
                    </Card>
            </Row>
        </Container>

            {/* Footer */}
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
                                <li><a href="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</a></li>
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

            {/* Footer secondaire */}
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