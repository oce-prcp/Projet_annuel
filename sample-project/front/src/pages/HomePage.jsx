import React, { useState, useEffect } from 'react';
import logo from '../../img/logo_data-save.png';
import logoScrolled from '../../img/logo-datasave.png'; 
import { FaCloudUploadAlt, FaSyncAlt, FaLock } from 'react-icons/fa';
import './HomePage.css';

const HomePage = () => {
    const [navbarColor, setNavbarColor] = useState('transparent');
    const [logoImage, setLogoImage] = useState(logo);
    const [textColor, setTextColor] = useState('black'); // État pour la couleur du texte

    const changeNavbarColorAndLogo = () => {
        if (window.scrollY >= 80) {
            setNavbarColor('#0a242e');
            setLogoImage(logoScrolled);
            setTextColor('white'); // Change le texte en blanc au défilement
        } else {
            setNavbarColor('transparent');
            setLogoImage(logo);
            setTextColor('black'); // Rétablit le texte en noir
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNavbarColorAndLogo);
        return () => {
            window.removeEventListener('scroll', changeNavbarColorAndLogo);
        };
    }, []);

    return (
        <div>
            <header className="fixed-top" style={{ backgroundColor: navbarColor, transition: 'background-color 0.5s ease' }}>
                <nav className="navbar navbar-expand-lg" style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={logoImage} alt="Logo" style={{ width: '100px' }} />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ color: textColor }}>Pourquoi Data Save ?</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ color: textColor }}>Solutions</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ color: textColor }}>Partenaires</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={{ color: textColor }}>Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            
            <div className="container-fluid text-center py-5" style={{ marginTop: '100px', backgroundColor: '#f8f9fa' }}>
                <h1 className="display-4">Stockez, éditez et partagez vos fichiers sur un cloud français</h1>
                <p className="lead">Solution de stockage de données au meilleur prix</p>
                <a href="#" className="btn btn-primary btn-lg mt-3">Créer un Compte</a>
            </div>
            
            <div className="container text-center py-5">
                <div className="row">
                    <div className="col-md-4">
                        <h3>4.9 avis Google</h3>
                        <p>★★★★★</p>
                    </div>
                    <div className="col-md-4">
                        <h3>4.8 avis Apple Store</h3>
                        <p>★★★★★</p>
                    </div>
                    <div className="col-md-4">
                        <h3>4.5 avis Les Numériques</h3>
                        <p>★★★★☆</p>
                    </div>
                </div>
            </div>

            {/* Section supplémentaire avec le titre et les icônes */}
            <div className="container text-center py-5" style={{ backgroundColor: '#f8f9fa' }}>
                <h2 className="mb-5">Que proposons-nous ?</h2>
                <div className="row justify-content-center">
                    <div className="col-md-3">
                        <div className="circle-icon mb-3">
                            <FaCloudUploadAlt size={40} color="white" />
                        </div>
                        <div className="card">
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
                        <div className="card">
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
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sécurité élevée</h5>
                                <p className="card-text">Nous utilisons les dernières technologies de cryptage pour garantir la sécurité de vos données.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;