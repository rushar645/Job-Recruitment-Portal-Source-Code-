import React from "react";
import "./userProfile.css";

const generateRandomColor = () => {
  let maxVal = 0xffffff; // 16777215.
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
};

const headerstyle = {
    color: generateRandomColor()
}

function UserProfile(props) {
  return (
    <div className="userProfileMainContainer">
      <div className="imageContainer">
        {(() => {
          if (props.userData.userImg in props.userData) {
            return <img src={props.userData.userImg} alt="User Profile Pic" />;
          } else {
            return <h1 style={headerstyle}>{props.userData.username[0]}</h1>;
          }
        })()}
      </div>
      <div className="detailsContainer">
        <p>
          <b>{props.userData.username}</b>
        </p>
        <p>{props.userData.Email}</p>
      </div>
    </div>
  );
}

export default UserProfile;
