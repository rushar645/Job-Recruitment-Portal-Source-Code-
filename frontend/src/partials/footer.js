import "./footer.css";
import { SlLocationPin } from "react-icons/sl";
import { SlPhone } from "react-icons/sl";
import { VscMail } from "react-icons/vsc";
import { VscGithub } from "react-icons/vsc";
import { SiTelegram } from "react-icons/si";
import {Link} from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";


const iconsSx = {
    fontSize: "1.5em",
    cursor:"pointer"
}

function Footer() {
    const {auth}=useAuth();


    return (
        <div className="footerContainer">
            <div className="footerTopContainer">
                <div className="footerTopLeftContainer">
                    <h2>About Us</h2>
                    <p className="footerIntro">
                        We are a platform where job seekers and employers can connect. We offer a safe and secure platform for our users to search for jobs or post any jobs.
                    </p>
                    <ul>
                        <li><SlLocationPin style={iconsSx} /><h3>India</h3></li>
                        <li><SlPhone style={iconsSx} /><h3>+912314567890</h3></li>
                        <li><VscMail style={iconsSx} /><h3>careermeet.helpdesk@gmail.com</h3></li>
                    </ul>
                </div>
                <div className="footerTopRightContainer">
                    <div>
                        <ul>
                            <li><Link to="">Home</Link></li>
                            <li><Link to="/search">Search Jobs</Link></li>
                            <li><Link to="/blog">Browse Blogs</Link></li>
                            <li><Link to={auth?"/profile":"/login"}>Profile</Link></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/testimonials">Testimonials</Link></li>
                            <li><Link to="faqs">FAQs</Link></li>
                            <li><Link to="termscondition">Terms & Conditions of Use</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footerBottomContainer">
                <h3>&#169; 2023 Career<span>Meet</span> &#124; All Rights Reserved</h3>
                <div>
                    <VscGithub style={iconsSx}/>
                    <SiTelegram style={iconsSx}/>
                </div>
            </div>
        </div>
    )
}

export default Footer;