import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./../templates/layout";
import Home from "./../templates/home";
import Blog from "./../templates/blog";
import Search from "./../templates/search";
import Login from "./../templates/login";
import Signup from "./../templates/signup";
import ForgotPassword from "./../templates/forgotPassword";
import VerifyAccount from "./../templates/verifyAccount";
import ProfilePage from "./../templates/profilePage";
import AuthLayout from "./../templates/authLayout";
import { useAuth } from "../contexts/AuthContext";
import CreateJobPost from "./../templates/createJobPost";
// import axios from "axios";
// import { useEffect } from "react";


function Navbar() {
  const { auth, user } = useAuth();

  console.log("ACTIVE USER: ",user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth?<AuthLayout userData={user}/>:<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/latest" />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route exact path="verifyAccount" />
          <Route path="verifyAccount/:userid" element={<VerifyAccount />} />
          <Route path="profile" element={<ProfilePage userData={user} />} />
          <Route path="postJob" element={<CreateJobPost />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar;
