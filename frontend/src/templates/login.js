import "./login.css";
import * as React from 'react';
import { Button } from "@mui/material";
import Image from "./../static/images/ResumeIllustration.png";
import { Outlet, Link } from "react-router-dom";

function LoginForm() {
    return (
        <div className="loginFormContainer">
            <div className="loginFormSibling">
                <img src={Image} alt="Resume Illustration"></img>
            </div>
            <div className="loginFormInnerContainer">
                <h1>Login Page</h1>
                <form action="/login" method="POST" className="LoginForm">
                    <input type="email" name="Email" placeholder="Email Id" required />
                    <input type="password" name="Password" placeholder="Password" required />
                    <Button variant="contained" sx={{ textTransform: 'capitalize', margin: '1vh', width: '35%', borderRadius: '20px' }}>Login</Button>
                </form>
                <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
        </div>
    )
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
    )
}

export default Login;