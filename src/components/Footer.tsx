import twitter from '../assets/logo/twitter-round-color-icon.png'
import github from '../assets/logo/github-icon.png'
import discord from '../assets/logo/discord-icon.png'

const Footer = () => {
    return (
        <div className="footerBG">
            <div className="icons">
            <img src={twitter} alt=""  className="twitterIcon"/>
            <img src={github} alt=""  className="githubIcon"/>
            <img src={discord} alt=""  className="discordIcon"/>
            </div>
            <div className="footerContent">
                <div className='textFooter'><span className='logoname'>SketchSync -</span> <div>An Online Whiteboard with Real-time collaboration</div></div>
            </div>
        </div>
    );
};

export default Footer;
