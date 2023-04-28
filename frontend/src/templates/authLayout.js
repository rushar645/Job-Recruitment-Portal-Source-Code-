import { Outlet, Link } from "react-router-dom";
import "./layout.css";
// import Button from "@mui/material/Button";
// import { Stack } from "@mui/system";
import UserProfile from "../components/profilePic/userProfile";

// const btnHoverSx = {
//   textTransform: "capitalize",
//   "&:hover": {
//     backgroundColor: "#000",
//     color: "#fff",
//   },
// };

// const userData = {
//     username: "Purushartha",
//     useremail: "purushartha3011@gmail.com",
//     userImg: require("./../static/images/contacts.png"),
//   };
  

const AuthLayout = (props) => {
  return (
    <>
      <div className="NavContainer">
        <nav className="listContainer-side">
          <h1 className="brandStyling">
            <Link to="/">
              Career<span>Meet</span>
            </Link>
          </h1>
        </nav>
        <nav className="listContainer-center">
          <ul className="listStyling">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Search">Search</Link>
            </li>
            <li>
              <Link to="/Blog">Blog</Link>
            </li>
          </ul>
        </nav>
        <nav className="listContainer-side">
          <Link to="/profile"><UserProfile userData={props.userData} /></Link>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default AuthLayout;
