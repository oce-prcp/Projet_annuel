import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import logo from '../../img/logo_data-save.png';
import logoScrolled from '../../img/logo-datasave.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import './Navbar.css';



const NavbarComponent = () => {
    const [navbarColor, setNavbarColor] = useState('transparent');
    const [logoImage, setLogoImage] = useState(logo);
    const [textColor, setTextColor] = useState('black');
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await axios.get('http://localhost:8000/user/getUserId', { withCredentials: true });
                const userId = userResponse.data.userId;
                setUserId(userId);
            }catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        }
        fetchUserData();
    }, []);

    const logout = async () => {
        Cookies.remove('auth_token', {path: '/', domain: 'localhost'});
        window.location.href = '/login';
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

    return (
        <header className="fixed-top" style={{ backgroundColor: navbarColor, transition: 'background-color 0.5s ease' }}>
            <Navbar expand="lg" style={{ borderBottom: '1px solid #e0e0e0' }}>
                <Container fluid className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="/">
                        <img src={logoImage} alt="Logo" style={{ width: '100px' }} />
                    </Navbar.Brand>
                    <Navbar.Collapse id="navbarNav" className="d-flex justify-content-end">
                        <Nav className="mr-auto">
                            <Nav.Link href="/" style={{ color: textColor }}>Pourquoi Data Save ?</Nav.Link>
                        </Nav>
                        {
                            userId ? (
                                <>
                                <Button onClick={logout} variant="outline-light" style={{ backgroundColor: '#dc3545', color: 'white', marginLeft: "4px" }}>Déconnexion</Button>
                                <Button href="/dashboard" variant="outline-light" style={{ backgroundColor: '#038A8A', color: 'white', marginLeft: "4px" }}>
                                    Dashboard
                                </Button>
                                </>
                            ) : (
                                <a className="btn btn-outline-light" href="/login" style={{ backgroundColor: '#038A8A', color: 'white' }}>
                                Se connecter
                                </a>
                            )
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default NavbarComponent;