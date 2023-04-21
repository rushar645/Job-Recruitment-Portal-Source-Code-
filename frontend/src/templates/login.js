import "./login.css";
import * as React from 'react';
import { Button } from "@mui/material";
import Image from "./../static/images/ResumeIllustration.png";
import { Outlet, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

function LoginForm() {
    const [formData, setFormData] = useState({"email":'',"password":''});
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [isVisible,setIsVisible]=useState(false);

    const postData=(formData)=>{
        const res=axios.post("http://127.0.0.1:5000/login",formData);
    }

    const collectFormdata=(e)=>{
        e.preventDefault();
        setFormData({
            "email":email,
            "password":password
        })
        console.log(formData);
        // document.getElementById("loginForm").submit();
    }

    useEffect((email,password)=>{
        // postData(formData);
        // console.log(email,password);
    },[]);

    return (
        <div className="loginFormContainer">
            <div className="loginFormSibling">
                <img src={Image} alt="Resume Illustration"></img>
            </div>
            <div className="loginFormInnerContainer">
                <h1>Login Page</h1>
                <form action="/login" name="loginForm" id="loginForm" method="POST" className="LoginForm">
                    <input type="email" name="Email" value={email} onChange={(e)=>{setEmail(e.target.value);}} placeholder="Email Id" required />
                    <input type={isVisible? 'text':'password'} name="Password" value={password} onChange={(e)=>{setPassword(e.target.value);setFormData({"password":password});}} placeholder="Password" required />
                    <label><input type="checkbox" onChange={()=>{setIsVisible(!isVisible)}}/>&nbsp;Show Password</label>
                    <Button variant="contained" onClick={(e)=>{collectFormdata(e)}} sx={{ textTransform: 'capitalize', margin: '1vh', width: '35%', borderRadius: '20px' }}>Login</Button>
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