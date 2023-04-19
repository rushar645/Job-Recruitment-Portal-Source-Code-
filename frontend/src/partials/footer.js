import "./footer.css";
import { SlLocationPin } from "react-icons/sl";
import { SlPhone } from "react-icons/sl";
import { VscMail } from "react-icons/vsc";
import { VscGithub } from "react-icons/vsc";
import { SiTelegram } from "react-icons/si";

const iconsSx = {
    fontSize: "1.5em",
    cursor:"pointer"
}

function Footer() {
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
                        <li><VscMail style={iconsSx} /><h3>abc@gmail.com</h3></li>
                    </ul>
                </div>
                <div className="footerTopRightContainer">
                    <div>
                        <ul>
                            <li>Search Jobs</li>
                            <li>Search Recruiters</li>
                            <li>Browse Blogs</li>
                            <li>Profile</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>About Us</li>
                            <li>Recommendations</li>
                            <li>FAQs</li>
                            <li>Terms & Conditions of Use</li>
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