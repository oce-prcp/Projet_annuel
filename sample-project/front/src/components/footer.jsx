import React from 'react';
import footerLogo from '../../img/logo_datasave.png';
import './Footer.css';

const FooterComponent = () => {
    return (
        <>
            {/* Footer principal */}
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
            <footer className="footer-secondary" style={{ backgroundColor: 'black', color: 'white', padding: '10px 0' }}>
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

export default FooterComponent;
