import { useEffect, useState } from "react";
import "./viewProfilePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

const ViewProfilePage = () => {
  let userId = useParams();
  const [user, setUser] = useState({});
  const [profileImg, setProfileImg] = useState("");

  let url = `/api/getUser/${userId.id}`;
  useEffect(() => {
    const getUserData = async () => {
      let res = await axios.get(url);

      console.log(res.data);
      setUser(res.data);
      setProfileImg(
        `data:image/png;base64,${Buffer.from(
          res.data.profileImg.data,
          "binary"
        ).toString("base64")}`
      );
    };

    getUserData();
  }, [url]);

  return (
    <div className="viewProfilePageMainContainer">
      <div className="profilePage">
        <div className="profileHeaders">
          <div className="imageHeader">
            {profileImg ? <img src={profileImg} alt={user.username} /> : ""}
          </div>
          <div className="otherHeader">
            <div>
              <h1>{user.fullname}</h1>
              <h3>Aspiring {user.dreamRole}</h3>
            </div>
            <div>
              <h4>{user.Email}</h4>
              <h4>{user.linkedin}</h4>
              <h4>{user.portfolioLink}</h4>
            </div>
          </div>
        </div>
        <div className="profileBody">
          <div className="education">
            <h1>Education</h1>
            <ul>
              {user.education?.map((data) => {
                return (
                  <li key={data._id} className="listItem">
                    <div>
                        <p><strong>Course: </strong>{data.course}</p>
                        <p><strong>Institute: </strong>{data.institute}</p>
                        <p><strong>Last Year: </strong>{data.lastYear}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
