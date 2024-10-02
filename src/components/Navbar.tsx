import { Link } from "react-router-dom";
import navLogo from "../assets/logo/navLogo.png";
import "../CSS/navbar.css";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo-link">
        <img src={navLogo} alt="SketchSync Logo" className="navbar__logo" />
      </Link>
      <button className="navbar__toggle" onClick={toggleMenu}>
        <i className={`ri-${isMenuOpen ? 'close-line' : 'menu-3-fill'}`} />
      </button>
      <ul className={`navbar__links ${isMenuOpen ? 'navbar__links--active' : ''}`}>
        <li><Link to="/" className="navbar__link">Home</Link></li>
        <li><Link to="/gallery" className="navbar__link">Gallery</Link></li>
        <li><Link to="/mydrawing" className="navbar__link">My Drawings</Link></li>
        <li><Link to="/test" className="navbar__link">Collaborate</Link></li>
        <li><Link to="/help" className="navbar__link">Help/Support</Link></li>
        <li><Link to="/login" className="navbar__link navbar__link--signup">Login/SignUp</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;