import { Link } from "react-router-dom";
import navLogo from "../assets/logo/navLogo.png";

interface propTypes {
  isBarClicked : boolean,
  setIsBarClicked :  React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({isBarClicked,setIsBarClicked} : propTypes) => {
  const icon = isBarClicked ? "ri-close-line" : "ri-menu-3-fill"
  return (
    <nav className="navbar">
    <img src={navLogo} alt="" className="navLogo" />
    <div>
    <i className={`${icon} barIcon`} onClick={() => setIsBarClicked(prev => !prev)}></i>
      <ul className="nav--links">
        <li className="home">Home</li>
        <Link to="/gallery"><li>Gallery</li></Link>
        <Link to="mydrawing"><li>My Drawings</li></Link>
        <Link to="/test"><li>Collaborate</li></Link>
        <li>Help/Support</li>
        <Link to="/login"><li className="signUp">Login/SignUp</li></Link>
      </ul>
    </div>
  </nav>
  )
}

export default Navbar