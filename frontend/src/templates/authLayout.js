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

const userData = {
    username: "Purushartha",
    useremail: "purushartha3011@gmail.com",
    userImg: require("./../static/images/contacts.png"),
  };
  

const AuthLayout = () => {
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
          {/* <div className="buttonsContainer">
            <div className="btnGroup">
              <Stack direction="row" spacing={5}>
                <Link to="/signup">
                  <Button variant="contained" sx={btnHoverSx}>
                    Signup
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="contained" sx={btnHoverSx}>
                    Login
                  </Button>
                </Link>
              </Stack>
            </div>
          </div> */}
          <Link to="/profile"><UserProfile userData={userData} /></Link>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default AuthLayout;