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
        </div>
    );
};

export default HomePage;
