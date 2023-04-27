import "./login.css";
import * as React from "react";
import { Button } from "@mui/material";
import Image from "./../static/images/ResumeIllustration.png";
import { Outlet, Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const postData = async (formData) => {
    console.log(formData);
    // axios.defaults.withCredentials = true;
    const res = await axios
      .post("/api/login",formData)
      .then((response) => {
        console.log(response.status,typeof(response.status));
        return response.status;
      })
      .catch((err) => {
        console.log(err);
      });
    if ((res===211)) {
      toast.info("User not Found.Please signup to our website first.", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }
    if (res=== 212) {
      toast.info("Incorrect Password", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }
    if (res === 210) {
      setAuth(true);
      navigate("/", { replace: true });
    }
  };

  const collectFormdata = (e) => {
    e.preventDefault();
    var emailFormat = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!email.match(emailFormat)) {
      toast.warning("Please enter according to correct Email format.", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
      return;
    }

    if (email.length === 0 || password.length < 8) {
      if (password.length < 8) {
        toast.warning("Password too small!", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
      }
      if (email.length === 0) {
        toast.warning("Email Field is empty", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
      }
      return;
    } else {
      var formData = {
        email: email,
        password: password,
      };
      postData(formData);
    }
    // document.getElementById("loginForm").submit();
  };

  return (
    <div className="loginFormContainer">
      <div className="loginFormSibling">
        <img src={Image} alt="Resume Illustration"></img>
      </div>
      <div className="loginFormInnerContainer">
        <h1>Login Page</h1>
        <form
          name="loginForm"
          method="POST"
          id="loginForm"
          className="LoginForm"
        >
          <input
            type="email"
            name="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email Id"
            required
          />
          <input
            type={isVisible ? "text" : "password"}
            name="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            required
          />
          <label>
            <input
              type="checkbox"
              onChange={() => {
                setIsVisible(!isVisible);
              }}
            />
            &nbsp;Show Password
          </label>
          <Button
            variant="contained"
            onClick={(e) => {
              collectFormdata(e);
            }}
            sx={{
              textTransform: "capitalize",
              margin: "1vh",
              width: "35%",
              borderRadius: "20px",
            }}
          >
            Login
          </Button>
        </form>
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
    </div>
  );
}

function Login() {
  return (
    <>
      <div className="loginBodyContainer">
        <div className="loginFormOuterContainer">
          <LoginForm />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Login;
