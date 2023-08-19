//https://source.unsplash.com/random/300x200
// import mainImg from "../assets/mainImg/pexels-steve-johnson-1704120.jpg";
import { useState } from "react";
import vector from "../assets/mainImg/artist-g23008a322_1280.png";
import "../CSS/style.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
//https://source.unsplash.com/300x300/?quotes
import Footer from "./Footer";

const MainSection = () => {
  const [isBarClicked, setIsBarClicked] = useState(false);
  return (
    <>
      <section>
        <Navbar isBarClicked={isBarClicked} setIsBarClicked={setIsBarClicked} />
        {isBarClicked && (
          <div className="menuBar">
            <ul className="">
              <li>Home</li>
              <Link to="/gallery"><li>Gallery</li></Link>
              <Link to="/mydrawing"><li>My Drawings</li></Link>
              <Link to="/test"><li>Collaborate</li></Link>
              <li>Help/Support</li>
              <Link to="/login">
                <li className="signUp">Login/SignUp</li>
              </Link>
            </ul>
          </div>
        )}
        <header>
          <img
            src="https://loremflickr.com/420/400/drawing"
            className="mainImg"
          />
          <div className="overText">
            Online Whiteboard with Realtime Collaboration
          </div>
        </header>
        <div className="mainTexts">
          <div>
            <div className="section--heading">
              Virtual online whiteboard with team collaboration
            </div>
            <div className="setPadding">
              Sketch Sync is a powerful and versatile tool for anyone who needs
              to collaborate on drawings or designs. With its real-time
              collaboration, intuitive interface, and powerful features, it's
              the perfect app for remote teams, artists, designers, and anyone
              else who needs to create and share drawings.
              <Link to="/draw">
                <div className="startDraw">Start Drawing Now</div>
              </Link>
            </div>
            <div>
              <div className="section--heading">Real-time collaboration</div>
              <div className="setPadding">
                Sketch Sync allows you to work with others in real-time, which
                means that you can see changes as they are made and work on the
                same drawing simultaneously. This makes it perfect for team
                projects and remote work, as everyone can be on the same page
                and stay in sync.
              </div>
            </div>
            <div className="section--heading">
              Simple and intuitive interface
            </div>
            <div className="setPadding">
              The Sketch Sync interface is designed to be simple and easy to
              use, so you can focus on your creative ideas instead of trying to
              figure out how to use the app. With its intuitive design, you can
              create and edit drawings quickly and easily, even if you're new to
              drawing apps.
            </div>
          </div>
          <div>
            <div className="grid">
              <div>
                <div className="section--heading">Scalable and reliable</div>
                <div className="setPadding">
                  Sketch Sync is built using the latest technologies, including
                  React and Firebase, which ensure that it is scalable, fast,
                  and reliable. This means that it can handle large projects and
                  multiple users without lag or connection issues, so you can
                  collaborate seamlessly.
                </div>
              </div>
              <img src={vector} className="vectorImg" alt="" />
            </div>
            <div className="section--heading">Powerful features</div>
            <div className="setPadding">
              Sketch Sync includes a range of powerful features that make it the
              perfect tool for designers, artists, and creatives of all levels.
              You can save and export your work in a variety of formats, use
              different brushes and colors, and chat with collaborators in
              real-time. Plus, the app is regularly updated with new features
              and improvements.
            </div>
          </div>
          <div>
            <div className="section--heading">
              Multiple device compatibility
            </div>
            <div className="setPadding">
              Sketch Sync can be used on a variety of devices, including desktop
              computers, laptops, tablets, and smartphones. This means that you
              can work on your projects from anywhere, at any time, without
              being tied to a specific device or location.
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default MainSection;
