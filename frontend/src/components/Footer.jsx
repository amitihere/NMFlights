import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // remove if you want instant
        });
        };

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-section footer-brand">
                    <h2 className="footer-logo">NMFlights</h2>
                    <p className="footer-tagline">
                        Track flights in real-time. Stay informed with accurate flight data from around the world.
                    </p>
                    <div className="footer-social">
                        <a href="#" className="social-link" aria-label="Twitter">
                            <img src="" />
                        </a>
                        <a href="#" className="social-link" aria-label="GitHub">
                            <img src="" />
                        </a>
                        <a href="#" className="social-link" aria-label="LinkedIn">
                            <img src="" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="footer-links">
                        <li><a onClick={scrollToTop}>Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#flights">Flights</a></li>
                    </ul>
                </div>

                {/* Features */}
                <div className="footer-section">
                    <h3 className="footer-heading">Features</h3>
                    <ul className="footer-links">
                        <li><a href="#live-tracking">Live Flight Tracking</a></li>
                        <li><a href="#airline-search">Search by Airlines</a></li>
                        <li><a href="#airport-info">Airport Information</a></li>
                        <li><a href="#flight-routes">Flight Routes</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-section">
                    <h3 className="footer-heading">Contact</h3>
                    <ul className="footer-links footer-contact">
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                            <span>support@nmflights.com</span>
                        </li>
                        <li>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                            <span>Maharashtra, India</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} NMFlights. All rights reserved.</p>
                <div className="footer-bottom-links">
                    <a href="#privacy">Privacy Policy</a>
                    <span>•</span>
                    <a href="#terms">Terms of Service</a>
                    <span>•</span>
                    <a href="#cookies">Cookie Policy</a>
                </div>
            </div>
        </footer>
    );
}
