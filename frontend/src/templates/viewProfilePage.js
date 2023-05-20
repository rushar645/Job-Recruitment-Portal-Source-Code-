import { useEffect, useState } from "react";
import "./viewProfilePage.css";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";


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
          {profileImg?<div className="profileImageHeader">
            {profileImg ? <img src={profileImg} alt={user.username} /> : ""}
          </div>:""}
          <div className="otherHeader">
            <div>
              {user.fullname?<h1>{user.fullname}</h1>:""}
              {user.dreamRole?<h3>Aspiring {user.dreamRole}</h3>:""}
            </div>
            <div className="linksContainer">
              {user.Email?<h4><GrMail/>:<span>{user.Email}</span></h4>:""}
              {user.linkedin?<h4><FaLinkedin/>: <Link to={user.linkedin} target="_blank" title={user.linkedin}>View Linkedin</Link></h4>:""}
              {user.portfolioLink?<h4><FaGithub/>: <Link to={user.portfolioLink} target="_blank" title={user.portfolioLink}>View Portfolio/Github Profile</Link></h4>:""}
            </div>
          </div>
        </div>
        <div className="profileBody">
          {user.skills?.length>=1?<div className="skillsSection">
            <h1>Skills</h1>
            <ul>
              {user.skills?.map((skill)=>{
                return (
                  <li key={skill._id} className="skillsContainer">{skill}</li>
                )
              })}
            </ul>
          </div>:""}
          {user.education?.length>=1?<div className="education">
            <h1>Education</h1>
            <ul>
              {user.education?.map((data) => {
                return (
                  <li key={data._id} className="listItem">
                    <div>
                        <p><strong>Course:&nbsp;&nbsp; </strong>{data.course}</p>
                        <p><strong>Institute:&nbsp;&nbsp; </strong>{data.institute}</p>
                        <p><strong>Passing Year:&nbsp;&nbsp; </strong>{data.lastYear}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>:""}
          {user.experience?.length>=1?<div className="education">
            <h1>Experience</h1>
            <ul>
              {user.experience?.map((data) => {
                return (
                  <li key={data._id} className="listItem">
                    <div>
                        <p><strong>Company:&nbsp;&nbsp; </strong>{data.company}</p>
                        <p><strong>Designation:&nbsp;&nbsp; </strong>{data.designation}</p>
                        <p><strong>Duration:&nbsp;&nbsp; </strong>{data.duration}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>:""}
          {user.projects?.length>=1?<div className="education">
            <h1>Projects</h1>
            <ul>
              {user.projects?.map((data) => {
                return (
                  <li key={data._id} className="listItem">
                    <div>
                        <p><strong>Project Title:&nbsp;&nbsp; </strong>{data.projectTitle}</p>
                        <p><strong>Project Link:&nbsp;&nbsp; </strong><Link to={data.projectLink} title={data.projectLink}>Visit Repository</Link></p>
                        <p><strong>Skills used:&nbsp;&nbsp; </strong>{data.skillsUsed?.map((skill)=>{return(<span key={skill._id} className="skillsContainer">{skill}</span>)})}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>:""}
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
