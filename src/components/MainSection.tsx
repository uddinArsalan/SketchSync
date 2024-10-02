import { useState,useEffect } from "react";
import vector from "../assets/mainImg/artist-g23008a322_1280.png";
import "../CSS/MainSection.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="main-section">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      {isMenuOpen && (
        <nav className="mobile-menu">
          <ul className="mobile-menu__list">
            <li><Link to="/" className="mobile-menu__link">Home</Link></li>
            <li><Link to="/gallery" className="mobile-menu__link">Gallery</Link></li>
            <li><Link to="/mydrawing" className="mobile-menu__link">My Drawings</Link></li>
            <li><Link to="/test" className="mobile-menu__link">Collaborate</Link></li>
            <li><Link to="#" className="mobile-menu__link">Help/Support</Link></li>
            <li><Link to="/login" className="mobile-menu__link mobile-menu__link--signup">Login/SignUp</Link></li>
          </ul>
        </nav>
      )}

      <header className="hero">
        <div className="hero__parallax" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <img
            src="https://loremflickr.com/1000/800/drawing"
            alt="Online Whiteboard"
            className="hero__image"
          />
        </div>
        <div className="hero__text">
          Online Whiteboard with Realtime Collaboration
        </div>
      </header>

      <main className="content">
        <section className="content__section">
          <h2 className="content__heading">Virtual online whiteboard with team collaboration</h2>
          <p className="content__text">
            Sketch Sync is a powerful and versatile tool for anyone who needs
            to collaborate on drawings or designs. With its real-time
            collaboration, intuitive interface, and powerful features, it's
            the perfect app for remote teams, artists, designers, and anyone
            else who needs to create and share drawings.
          </p>
          <Link to="/draw" className="cta-button">Start Drawing Now</Link>
        </section>

        <section className="content__section">
          <h2 className="content__heading">Real-time collaboration</h2>
          <p className="content__text">
            Sketch Sync allows you to work with others in real-time, which
            means that you can see changes as they are made and work on the
            same drawing simultaneously. This makes it perfect for team
            projects and remote work, as everyone can be on the same page
            and stay in sync.
          </p>
        </section>

        <section className="content__section">
          <h2 className="content__heading">Simple and intuitive interface</h2>
          <p className="content__text">
            The Sketch Sync interface is designed to be simple and easy to
            use, so you can focus on your creative ideas instead of trying to
            figure out how to use the app. With its intuitive design, you can
            create and edit drawings quickly and easily, even if you're new to
            drawing apps.
          </p>
        </section>

        <section className="content__section content__section--feature">
          <div className="feature__text">
            <h2 className="content__heading">Scalable and reliable</h2>
            <p className="content__text">
              Sketch Sync is built using the latest technologies, including
              React and Firebase, which ensure that it is scalable, fast,
              and reliable. This means that it can handle large projects and
              multiple users without lag or connection issues, so you can
              collaborate seamlessly.
            </p>
          </div>
          <div className="feature__image-container">
            <img src={vector} className="feature__image" alt="Scalable and reliable illustration" />
          </div>
        </section>

        <section className="content__section">
          <h2 className="content__heading">Powerful features</h2>
          <p className="content__text">
            Sketch Sync includes a range of powerful features that make it the
            perfect tool for designers, artists, and creatives of all levels.
            You can save and export your work in a variety of formats, use
            different brushes and colors, and chat with collaborators in
            real-time. Plus, the app is regularly updated with new features
            and improvements.
          </p>
        </section>

        <section className="content__section">
          <h2 className="content__heading">Multiple device compatibility</h2>
          <p className="content__text">
            Sketch Sync can be used on a variety of devices, including desktop
            computers, laptops, tablets, and smartphones. This means that you
            can work on your projects from anywhere, at any time, without
            being tied to a specific device or location.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MainSection;