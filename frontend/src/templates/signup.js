import "./signup.css";
import { useState } from "react";
import JoinUs from "./../static/images/join_us.png";
import SignupImg from "./../static/images/signup_img.png";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleTabClick = (event) => {
  event.preventDefault();
  console.log(event.target);
  let employeeTab = document.getElementById("Employee");
  let candidateTab = document.getElementById("Candidate");
  let candidateForm = document.getElementsByClassName(
    "signupCandidateSectionContainer"
  )[0];
  let employeeForm = document.getElementsByClassName(
    "signupEmployeeSectionContainer"
  )[0];
  if (event.target === employeeTab) {
    employeeTab.classList.add("activeTab");
    candidateTab.classList.remove("activeTab");
    employeeForm.classList.remove("hide");
    candidateForm.classList.add("hide");
  } else if (event.target === candidateTab) {
    candidateTab.classList.add("activeTab");
    employeeTab.classList.remove("activeTab");
    employeeForm.classList.add("hide");
    candidateForm.classList.remove("hide");
  }
  // event.target.appendClass="activeTab";
};

const submitBtnStyle = {
  textTransform: "capitalize",
  height: "6vh",
  width: "40%",
  margin: "5vh 0vh",
  borderRadius: "20px",
  backgroundColor: "#1565c0",
  border: "none",
  outline: "none",
  color: "white",
  boxShadow: "1px 1px 1px 1px grey",
  cursor: "pointer",
};

function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPwd, setVerifyPwd] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  // let navigate = useNavigate();

  const validateFormInput = () => {
    var emailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (document.getElementById("Candidate").classList.contains("activeTab")) {
      if (
        email.length === 0 ||
        password.length === 0 ||
        username === 0 ||
        verifyPwd === 0
      ) {
        toast.error("Please fill all fields.", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }
      else if (!email.match(emailFormat)) {
        toast.error("Please enter a valid email", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }
      else if (password !== verifyPwd) {
        toast.error("Passwords do not match", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }else if(password.length<8 || verifyPwd.length<8){
        toast.error("Password must be at least 8 characters", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }else{
        return true;
      }
    } else if (
      document.getElementById("Employee").classList.contains("activeTab")
    ) {
      if (
        email.length === 0 ||
        password.length === 0 ||
        username === 0 ||
        verifyPwd === 0 ||
        companyEmail === 0
      ) {
        toast.error("Please fill all the fields.", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }
      else if (!email.match(emailFormat) || !companyEmail.match(emailFormat)) {
        toast.error("Please enter a valid email", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }
      else if (password !== verifyPwd) {
        toast.error("Passwords do not match", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }else if(password.length<8 || verifyPwd.length<8){
        toast.error("Password must be at least 8 characters", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
        return false;
      }else{
        return true;
      }
    }
  };

  const postFormData = async (formData) => {
    let res = await axios
      .post("/api/signup", formData)
      .then((response) => {
        return response.status;
      })
      .catch((err) => {
        console.log(err);
      });
    if (res === 209) {
      let message =
        "Signup Succesful! Please check your mail and verify your account before Login.";
      toast.info(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }
    if(res===213){
      toast.info("Email already in use.",{
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message"
      })
    }
  };

  const collectFormData = (e) => {
    e.preventDefault();
    if (validateFormInput()) {
      console.log("Form Validated");
      var formData;
      if (companyEmail.length === 0 && password === verifyPwd) {
        formData = {
          username: username,
          email: email,
          password: password,
          role: "user",
        };
      } else if (companyEmail.length > 0 && password === verifyPwd) {
        formData = {
          username: username,
          companyEmail: companyEmail,
          email: email,
          password: password,
          role: "employer",
        };
      }
      // console.log(formData);
      postFormData(formData);
    }
  };

  return (
    <div className="signupBodyContainer">
      <div className="signupTabContainer">
        <div id="Candidate" className="activeTab" onClick={handleTabClick}>
          Candidate
        </div>
        <div id="Employee" className="" onClick={handleTabClick}>
          Guest
        </div>
      </div>
      <div className="signupCandidateSectionContainer">
        <div className="tabDetailsLeftContainer">
          <img src={JoinUs} title="Join Us" alt="Join Us" />
        </div>
        <form
          className="tabDetailsRightContainer"
          name="candidateForm"
          id="candidateSignupform"
        >
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email ID"
            required
          />
          <input
            type={isVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(event) => {
              let pwd = event.target.value;
              console.log(pwd);
              setPassword(pwd);
              console.log("PASS: ", password);
            }}
            placeholder="Password"
            required
          />
          <input
            type={isVisible ? "text" : "password"}
            name="confirmPassword"
            value={verifyPwd}
            onChange={(event) => {
              console.log(password);
              setVerifyPwd(event.target.value);
            }}
            placeholder="Confirm Password"
            required
          />
          <div className="checkBoxContainer">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => setIsVisible(isVisible ? false : true)}
            />
            <label>Show Password</label>
          </div>
          <input
            type="submit"
            style={submitBtnStyle}
            onClick={collectFormData}
            value="Signup"
          />
        </form>
      </div>
      <div className="signupEmployeeSectionContainer hide">
        <form
          className="tabDetailsRightContainer"
          name="employeeForm"
          id="employeeSignupform"
        >
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="companyEmail"
            value={companyEmail}
            onChange={(e) => {
              setCompanyEmail(e.target.value);
            }}
            placeholder="Company Email"
            required
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="User Email"
            required
          />
          <input
            type={isVisible ? "text" : "password"}
            name="password"
            value={password}
            onChange={(event) => {
              let pwd = event.target.value;
              setPassword(pwd);
            }}
            placeholder="Password"
            required
          />
          <input
            type={isVisible ? "text" : "password"}
            name="confirmPassword"
            value={verifyPwd}
            onChange={(event) => {
              let pwd = event.target.value;
              setVerifyPwd(pwd);
            }}
            placeholder="Confirm Password"
            required
          />
          <div className="checkBoxContainer">
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => setIsVisible(isVisible ? false : true)}
            />
            <label>Show Password</label>
          </div>
          <input
            type="submit"
            style={submitBtnStyle}
            onClick={collectFormData}
            value="Signup"
          />
        </form>
        <div className="tabDetailsLeftContainer">
          <img src={SignupImg} title="Join Us" alt="Join Us" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
