import "./login.css";
import * as React from "react";
import { Button } from "@mui/material";
import Image from "./../static/images/ResumeIllustration.png";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const postData = async (formData) => {
    console.log(formData);
    const res = await axios
      .post("http://127.0.0.1:5000/login", formData)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(res);
  };

  const collectFormdata = (e) => {
    e.preventDefault();
    var formData = {
      email: email,
      password: password,
    };
    postData(formData);
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
