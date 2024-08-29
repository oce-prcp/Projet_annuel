import React, { useState, useEffect, useRef } from 'react';
import logo from '../../img/logo_data-save.png';
import logoScrolled from '../../img/logo-datasave.png'; 
import banner from '../../img/banner_home.png'; 
import footerLogo from '../../img/logo_datasave.png'; 
import { FaCloudUploadAlt, FaSyncAlt, FaLock } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
    const [navbarColor, setNavbarColor] = useState('transparent');
    const [logoImage, setLogoImage] = useState(logo);
    const [textColor, setTextColor] = useState('black');

    // Références pour les cartes
    const cardRefs = useRef([]);

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

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        // Observer chaque carte
        cardRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            // Nettoyer l'observer
            cardRefs.current.forEach(ref => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    return (
        <div>
            <header className="fixed-top" style={{ backgroundColor: navbarColor, transition: 'background-color 0.5s ease' }}>
                <nav className="navbar navbar-expand-lg" style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <a className="navbar-brand" href="#">
                            <img src={logoImage} alt="Logo" style={{ width: '100px' }} />
                        </a>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ color: textColor }}>Pourquoi Data Save ?</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#solutions" style={{ color: textColor }}>Solutions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#contact" style={{ color: textColor }}>Contact</a>
                                </li>
                            </ul>
                            <a className="btn btn-outline-light" href="/login" style={{ backgroundColor: '#038A8A', color: 'white', borderColor: textColor }}>
                                Se connecter
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            
            {/* Section principale avec image de fond */}
            <div 
                className="container-fluid text-center py-5" 
                style={{ 
                    marginTop: '66px', 
                    backgroundImage: `url(${banner})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    color: 'white',
                    height: '800px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    backgroundColor: '#f8f9fa',
                    fontFamily: "'Poppins', sans-serif"
                }}
            >
                <h1 className="display-4" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '700' }}>
                    Stockez et éditez vos fichiers sur un cloud français
                </h1>
                <p className="lead" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Solution de stockage de données au meilleur prix
                </p>
                <a href="/subscription" className="btn btn-lg mt-3" style={{ backgroundColor: '#038A8A', color: 'white', fontFamily: "'Poppins', sans-serif" }}>
                    Créer un Compte
                </a>
            </div>

            {/* Section supplémentaire avec le titre et les icônes */}
            <div className="container text-center py-5" id="solutions" style={{ backgroundColor: '#f8f9fa', fontFamily: "'Poppins', sans-serif" }}>
                <h2 className="mb-5">Que proposons-nous ?</h2>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="circle-icon mb-3">
                            <FaCloudUploadAlt size={40} color="white" />
                        </div>
                        <div className="card fade-in" ref={(el) => (cardRefs.current[0] = el)}>
                            <div className="card-body">
                                <h5 className="card-title">Stockage de fichier</h5>
                                <p className="card-text">Possibilité de stocker tous les types de fichier jusqu'à 20 GO*</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="circle-icon mb-3">
                            <FaSyncAlt size={40} color="white" />
                        </div>
                        <div className="card fade-in" ref={(el) => (cardRefs.current[1] = el)}>
                            <div className="card-body">
                                <h5 className="card-title">Suivi en temps réel</h5>
                                <p className="card-text">Tous vos fichiers sont synchronisés en temps réel sur tous vos appareils.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="circle-icon mb-3">
                            <FaLock size={40} color="white" />
                        </div>
                        <div className="card fade-in" ref={(el) => (cardRefs.current[2] = el)}>
                            <div className="card-body">
                                <h5 className="card-title">Sécurité élevée</h5>
                                <p className="card-text">Nous utilisons les dernières technologies de cryptage pour garantir la sécurité de vos données.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
        </div>
    );
};

export default HomePage;
