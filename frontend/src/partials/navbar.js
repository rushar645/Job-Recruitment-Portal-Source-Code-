import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./../templates/layout";
import Home from "./../templates/home";
import Blog from "./../templates/blog";
import Search from "./../templates/search";
import Login from "./../templates/login";
import Signup from "./../templates/signup";
import ForgotPassword from "./../templates/forgotPassword";

function Navbar() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home />}/>
                    <Route path="search" element={<Search/>}/>
                    <Route path="blog" element={<Blog/>}/>
                    <Route path="blog/latest"/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="signup" element={<Signup/>}/>
                    <Route path="forgotpassword" element={<ForgotPassword/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Navbar;