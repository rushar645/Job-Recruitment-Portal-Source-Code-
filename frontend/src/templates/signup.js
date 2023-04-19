import "./signup.css";
import { useState } from "react";
import JoinUs from "./../static/images/join_us.png";

const handleTabClick = (event) => {
    event.preventDefault();
    console.log(event.target);
    let employeeTab = document.getElementById("Employee");
    let candidateTab = document.getElementById("Candidate");
    let candidateForm = document.getElementsByClassName("signupCandidateSectionContainer")[0];
    let employeeForm = document.getElementsByClassName("signupEmployeeSectionContainer")[0];
    if (event.target === employeeTab) {
        employeeTab.classList.add("activeTab");
        candidateTab.classList.remove("activeTab");
        employeeForm.classList.remove("hide");
        candidateForm.classList.add("hide");
    }
    else if (event.target === candidateTab) {
        candidateTab.classList.add("activeTab");
        employeeTab.classList.remove("activeTab");
        employeeForm.classList.add("hide");
        candidateForm.classList.remove("hide");
    }
    // event.target.appendClass="activeTab";
}

const submitBtnStyle = {
    textTransform: 'capitalize',
    height: "6vh",
    width: "40%",
    margin: '5vh 0vh',
    borderRadius: '20px',
    backgroundColor: "#1565c0",
    border: "none",
    outline: "none",
    color: "white",
    boxShadow: "1px 1px 1px 1px grey",
    cursor: "pointer"
}

const validateFormInput = (event) => {
    event.preventDefault();
    var emailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    console.log(event.target.name);
    if (event.target.email.value.match(emailFormat)) {
        event.target.email.classList.remove("warning");
        console.log("MATCHED");
        return true;
    }
    else {
        event.target.email.classList.add("warning");
        event.target.email.focus();
        console.log("NOT MATCHED");
        return false;
    }
}

function Signup() {
    const [isVisible, setIsVisible] = useState(false);
    const [password, setPassword] = useState('');
    return (
        <div className="signupBodyContainer">
            <div className="signupTabContainer">
                <div id="Candidate" className="activeTab" onClick={handleTabClick} >Candidate</div>
                <div id="Employee" className="" onClick={handleTabClick} >Guest</div>
            </div>
            <div className="signupCandidateSectionContainer">
                <div className="tabDetailsLeftContainer">
                    <img src={JoinUs} title="Join Us" alt="Join Us" />
                </div>
                <form className="tabDetailsRightContainer" name="candidateForm" id="candidateSignupform" onSubmit={validateFormInput}>
                    <input type="text" id="" name="name" placeholder="Full Name" required />
                    <input type="email" id="" name="email" placeholder="Email ID" required />
                    <input type={isVisible ? "text" : "password"} id="" name="password" onChange={(event) => { let pwd = event.target.value; console.log(pwd); setPassword(pwd); console.log("PASS: ", password) }} placeholder="Password" required />
                    <input type={isVisible ? "text" : "password"} id="" name="confirmPassword" onChange={(event) => { console.log(password); setPassword(event.target.value); }} placeholder="Confirm Password" required />
                    <div className="checkBoxContainer">
                        <input type="checkbox" onChange={() => setIsVisible(isVisible ? false : true)} /><label>Show Password</label>
                    </div>
                    <input type="submit" style={submitBtnStyle} value="Signup" />
                </form>
            </div>
            <div className="signupEmployeeSectionContainer hide">
                <form className="tabDetailsRightContainer" name="employeeForm" id="employeeSignupform" onSubmit={validateFormInput}>
                    <input type="text" id="" name="name" placeholder="Full Name" required />
                    <input type="email" id="" name="companyEmail" placeholder="Company Email" required/>
                    <input type="email" id="" name="email" placeholder="User Email" required />
                    <input type={isVisible ? "text" : "password"} id="" name="password" onChange={(event) => { let pwd = event.target.value; setPassword(pwd);}} placeholder="Password" required />
                    <input type={isVisible ? "text" : "password"} id="" name="confirmPassword" onChange={(event) => { let pwd = event.target.value; setPassword(pwd);}} placeholder="Confirm Password" required />
                    <div className="checkBoxContainer">
                        <input type="checkbox" onChange={() => setIsVisible(isVisible ? false : true)} /><label>Show Password</label>
                    </div>
                    <input type="submit" style={submitBtnStyle} value="Signup" />
                </form>
                <div className="tabDetailsLeftContainer">
                    <img src={JoinUs} title="Join Us" alt="Join Us" />
                </div>
            </div>
        </div>
    )
}

export default Signup;