import React from 'react';
import { FaTwitter, FaGithub, FaDiscord } from 'react-icons/fa';
import '../CSS/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__social-icons">
        <a href="#" className="footer__icon-link"><FaTwitter className="footer__icon" /></a>
        <a href="#" className="footer__icon-link"><FaGithub className="footer__icon" /></a>
        <a href="#" className="footer__icon-link"><FaDiscord className="footer__icon" /></a>
      </div>
      <div className="footer__content">
        <span className="footer__logo">SketchSync</span>
        <p className="footer__description">An Online Whiteboard with Real-time collaboration</p>
      </div>
    </footer>
  );
};

export default Footer;
