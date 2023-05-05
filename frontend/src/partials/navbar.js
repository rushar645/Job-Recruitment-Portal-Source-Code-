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
import ViewJobPost from "../templates/viewJobPost";
import PageNotFound from "../templates/pageNotFound";
import CreateBlog from "../templates/createBlog";
import ViewBlogPage from "../templates/viewBlogPage";
import ViewProfilePage from "../templates/viewProfilePage";

function Navbar() {
  const { auth,user} = useAuth();

  console.log("NEW NAVBAR: ",auth,user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={auth?<AuthLayout userData={user.userData}/>:<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route exact path="blog" element={<Blog />} />
          <Route path="blog/createBlog" element={<CreateBlog/>}/>
          <Route exact path="blog/viewBlog"/>
          <Route path="blog/viewBlog/:id" element={<ViewBlogPage/>}/>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route exact path="verifyAccount" />
          <Route path="verifyAccount/:userid" element={<VerifyAccount />} />
          {auth?<Route path="profile" element={<ProfilePage userData={JSON.parse(sessionStorage.getItem("user"))} />} /> : ""}
          <Route exact path="viewJob"/>
          <Route path="viewJob/:id" element={<ViewJobPost />} />
          <Route exact path="viewProfile"/>
          <Route path="viewProfile/:id" element={<ViewProfilePage />} />
          {/* { auth && user.role==="employer" && <Route path="postJob" element={<CreateJobPost />}/>} */}
          {auth && user.userData.role==="employer" ? <Route path="postJob" element={<CreateJobPost/>} />:""}
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar;
