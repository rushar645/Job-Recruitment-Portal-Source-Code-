import React, { useState } from "react";
import "./profilePage.css";
import UserProfile from "../components/profilePic/userProfile";
import Button from "@mui/material/Button";

const userData = {
  username: "Purushartha",
  useremail: "purushartha3011@gmail.com",
  userImg: require("./../static/images/tickmark.png"),
};

const changeBg = (e) => {
  e.preventDefault();
  e.stopPropagation();
  let tabs = document.querySelectorAll(".leftMenu div");
  let tabContent = document.querySelectorAll(".rightFieldsContainer>div");
  console.log("Tabs Content: ",tabContent)
  tabs.forEach((tab) => {
    if (tab.classList.contains("active")) {
      tab.classList.remove("select", "active");
    }
    tabContent.forEach((con) => {
      // console.log(con);
      con.classList.add("hide");
    });
  });
};

const btnHoverSx = {
  textTransform: "capitalize",
  margin: "2vh 0vh",
  "&:hover": {
    backgroundColor: "#000",
    color: "#fff",
  },
};

const ProfilePage = () => {
  const [previewFile, setPreviewFile] = useState(
    require("./../static/images/contacts.png")
  );
  return (
    <div className="profilePageMainContainer">
      <div className="leftMenuContainer">
        <div className="userDetailsContainer">
          <UserProfile userData={userData} />
        </div>
        <div className="leftMenu">
          <div
            className="select active"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeBg(e);
              e.target.classList.add("select", "active");
              let ele = document.getElementById("profileContent");
              ele.classList.remove("hide");
            }}
          >
            Profile
          </div>
          <div
            className=""
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeBg(e);
              e.target.classList.add("select", "active");
              let ele = document.getElementById("accountContent");
              ele.classList.remove("hide");
            }}
          >
            Account & Security
          </div>
          <div
            className=""
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeBg(e);
              e.target.classList.add("select", "active");
              let ele = document.getElementById("historyContent");
              ele.classList.remove("hide");
            }}
          >
            Activity History
          </div>
          <div
            className=""
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeBg(e);
              e.target.classList.add("select", "active");
              let ele = document.getElementById("helpContent");
              ele.classList.remove("hide");
            }}
          >
            Help & Support
          </div>
          <Button variant="contained" sx={btnHoverSx}>
            Log out
          </Button>
        </div>
      </div>
      <div className="rightFieldsContainer">
        <div id="profileContent" className="">
          <div className="profileImg">
            <div className="imageBox">
              <img src={previewFile} alt="User" />
            </div>
            <label htmlFor="imageUpload">Change Photo</label>
            <input
              type="file"
              id="imageUpload"
              onChange={(e) => {
                console.log(URL.createObjectURL(e.target.files[0]));
                setPreviewFile(URL.createObjectURL(e.target.files[0]));
              }}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div className="profileForm">
            <div className="personalInfo">
              <h1>Personal Information</h1>
              <form>
                <input type="text" placeholder="Full Name"></input>
                <input type="email" placeholder="Email"></input>
                <input type="text" placeholder="Phone number"></input>
                <input type="text" placeholder="Gender"></input>
                <input type="text" placeholder="DOB"></input>
                <input type="text" placeholder="Address"></input>
                <input type="text" placeholder="Linkedin profile link"></input>
              </form>
              <div className="btnContainer">
                <Button variant="contained">Save</Button>
              </div>
            </div>
            <div className="preferenceSkills">
              <h1>Personal Information</h1>
              <form>
                <input type="text" placeholder="Full Name"></input>
                <input type="email" placeholder="Email"></input>
                <input type="text" placeholder="Phone number"></input>
                <input type="text" placeholder="Gender"></input>
                <input type="text" placeholder="DOB"></input>
                <input type="text" placeholder="Address"></input>
                <input type="text" placeholder="Linkedin profile link"></input>
              </form>
              <div className="btnContainer">
                <Button variant="contained">Save</Button>
              </div>
            </div>
            <div className="projects"></div>
            <div className="experience"></div>
            <div className="education"></div>
            <div className="certifications"></div>
          </div>
        </div>
        <div id="accountContent" className="hide">
          <div>ACCOUNT</div>
        </div>
        <div id="historyContent" className="hide">
          <div>HISTORY</div>
        </div>
        <div id="helpContent" className="hide">
          <div>HELP CONTENT</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
