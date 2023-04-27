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

function Navbar() {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth?<AuthLayout/>:<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/latest" />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route exact path="verifyAccount" />
          <Route path="verifyAccount/:userid" element={<VerifyAccount />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar;
