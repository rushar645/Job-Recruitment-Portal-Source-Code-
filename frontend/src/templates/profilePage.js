import { useEffect, useState } from "react";
import "./profilePage.css";
import UserProfile from "../components/profilePic/userProfile";
import Button from "@mui/material/Button";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainJobCard from "./../components/jobCards/mainJobCard";


// const userData = {
//   username: "Purushartha",
//   useremail: "purushartha3011@gmail.com",
//   userImg: require("./../static/images/contacts.png"),
// };

const changeBg = (e) => {
  e.preventDefault();
  e.stopPropagation();
  let tabs = document.querySelectorAll(".leftMenu div");
  let tabContent = document.querySelectorAll(".rightFieldsContainer>div");
  console.log("Tabs Content: ", tabContent)
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

const ProfilePage = (props) => {
  const [previewFile, setPreviewFile] = useState(
    require("./../static/images/contacts.png")
  );

  const { setAuth, setUser } = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  const [fullname, setFullname] = useState();
  const [phoneno, setPhoneno] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [userAddress, setUserAddress] = useState();
  const [linkedin, setLinkedin] = useState();
  const [profileImg, setProfileImg] = useState();

  const [dreamRole, setDreamRole] = useState('');
  const [userSkills, setUserSkills] = useState([]);
  const [github, setGithub] = useState('');

  const [projectTitle, setProjectTitle] = useState('');
  const [skillsUsed, setSkillsUsed] = useState([]);
  const [projectLink, setProjectLink] = useState('');

  const [designation, setDesignation] = useState('');
  const [experienceCompany, setExperienceCompany] = useState('');
  const [duration, setDuration] = useState('');

  const [course, setCourse] = useState('');
  const [institute, setInstitute] = useState('');
  const [lastYear, setLastYear] = useState('');

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);


  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    let res = await axios.get("/api/logout").then((response) => {
      return response;
    }).catch((err) => {
      console.log(err);
    })

    if (res.status === 217) {
      setAuth(false);
      setUser(null);
      sessionStorage.removeItem("auth");
      sessionStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  }

  const sendPersonalInfo = async () => {
    const personalData = {
      fullname: fullname ? fullname : "",
      phoneno: phoneno ? phoneno : "",
      gender: gender ? gender : "",
      dob: dob ? dob : "",
      userAddress: userAddress ? userAddress : "",
      linkedin: linkedin ? linkedin : "",
      profileImg: profileImg ? profileImg : {}
    }

    let url = `/api/personalInfo`;
    if (personalData.profileImg === {}) {
      let res = await axios.post(url, personalData);
      if (res.status === 228) {
        toast.info("Saved Successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
      }
    } else {
      let res = await axios.post(url, personalData, { headers: { 'Content-Type': 'multipart/form-data' } });
      if (res.status === 228) {
        toast.info("Saved Successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: "colored",
          className: "toast-message",
        });
      }
    }

  }

  const sendPreferenceInfo = async () => {
    const preferenceData = {
      dreamRole: dreamRole,
      skills: userSkills,
      portfolioLink: github
    }

    console.log(preferenceData);

    let url = `/api/preferences`

    let res = await axios.post(url, preferenceData);
    if (res.status === 228) {
      toast.info("Saved Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }
  }

  const sendProjectData = async () => {
    const projectData = {
      projectTitle: projectTitle,
      projectLink: projectLink,
      skillsUsed: skillsUsed
    }
    console.log(projectData);
    let url = `/api/projects`;
    let res = await axios.post(url, projectData);

    if (res.status === 228) {
      toast.info("Saved Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }
  }

  const sendExperienceData = async () => {
    const experienceData = {
      designation: designation,
      company: experienceCompany,
      duration: duration
    }

    console.log(experienceData);
    let url = `/api/experience`;
    let res = await axios.post(url, experienceData);
    if (res.status === 228) {
      toast.info("Saved Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }


  }

  const sendEducationData = async () => {
    const educationData = {
      course: course,
      institute: institute,
      lastYear: lastYear
    }

    console.log(educationData);
    let url = `/api/education`;
    let res = await axios.post(url, educationData);
    if (res.status === 228) {
      toast.info("Saved Successfully", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }

  }

  useEffect(() => {
    const getProfileData = async () => {
      const res = await axios.get("/api/profilePage").then((response) => { return response; }).catch((err) => { console.log(err) });

      console.log("Response Data :", res.data);

      setAppliedJobs(res.data.appliedJobs);
      setPostedJobs(res.data.postedJobs)

    }
    getProfileData();
  }, [])


  console.log("PROFILE PAGE: ", props.userData.userData, appliedJobs, postedJobs);

  return (
    <div className="profilePageMainContainer">
      <div className="leftMenuContainer">
        <div className="userDetailsContainer">
          <UserProfile userData={props.userData.userData} />
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
           Edit Profile
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
          {props.userData.userData.role==="employer"?<div
            className=""
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              changeBg(e);
              e.target.classList.add("select", "active");
              let ele = document.getElementById("postedJobs");
              ele.classList.remove("hide");
            }}
          >
            Posted Jobs
          </div>:""}
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
          <Button variant="contained" sx={btnHoverSx} onClick={handleLogout}>
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
                setProfileImg(e.target.files[0]);
              }}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div className="profileForm">
            <div className="personalInfo">
              <h1>Personal Information</h1>
              <form>
                <input type="text" value={fullname} onChange={(e) => { e.preventDefault(); setFullname(e.target.value) }} placeholder="Full Name"></input>
                <input type="text" value={phoneno} onChange={(e) => { e.preventDefault(); setPhoneno(e.target.value) }} placeholder="Phone number"></input>
                <input type="text" value={gender} onChange={(e) => { e.preventDefault(); setGender(e.target.value) }} placeholder="Gender"></input>
                <input type="text" value={dob} onChange={(e) => { e.preventDefault(); setDob(e.target.value) }} placeholder="DOB"></input>
                <input type="text" value={userAddress} onChange={(e) => { e.preventDefault(); setUserAddress(e.target.value) }} placeholder="Address"></input>
                <input type="text" value={linkedin} onChange={(e) => { e.preventDefault(); setLinkedin(e.target.value) }} placeholder="Linkedin profile link"></input>
              </form>
              <div className="btnContainer">
                <Button variant="contained" onClick={sendPersonalInfo} >Save</Button>
              </div>
            </div>
            <div className="preferenceSkills">
              <h1>Preferences/Skills</h1>
              <form>
                <input type="text" value={dreamRole} onChange={(e) => { setDreamRole(e.target.value) }} placeholder="Position you're looking for. Eg: Software Engineer" />
                <input type="text" value={userSkills} onChange={(e) => { setUserSkills(e.target.value.split(",")) }} placeholder="Skills. Eg: HTML, CSS, JS, etc." />
                <input type="text" value={github} onChange={(e) => { setGithub(e.target.value) }} placeholder="Portfolio website/ Github Profile" />
              </form>
              <div className="btnContainer">
                <Button variant="contained" onClick={sendPreferenceInfo} >Save</Button>
              </div>
            </div>
            <div className="projects">
              <h1>Projects</h1>
              <form>
                <input type="text" value={projectTitle} onChange={(e) => { setProjectTitle(e.target.value) }} placeholder="Project Title" />
                <input type="text" value={skillsUsed} onChange={(e) => { setSkillsUsed(e.target.value.split(",")) }} placeholder="Technologies used" />
                <input type="text" value={projectLink} onChange={(e) => { setProjectLink(e.target.value) }} placeholder="Github Link" />
              </form>
              <div className="btnContainer">
                <Button variant="contained" onClick={sendProjectData} >add</Button>
              </div>
            </div>
            <div className="experience">
              <h1>Experience</h1>
              <form>
                <input type="text" value={designation} onChange={(e) => { setDesignation(e.target.value) }} placeholder="Designation" />
                <input type="text" value={experienceCompany} onChange={(e) => { setExperienceCompany(e.target.value) }} placeholder="Company Name" />
                <input type="text" value={duration} onChange={(e) => { setDuration(e.target.value) }} placeholder="Duration" />
              </form>
              <div className="btnContainer">
                <Button variant="contained" onClick={sendExperienceData} >add</Button>
              </div>
            </div>
            <div className="education">
              <h1>Education</h1>
              <form>
                <input type="text" value={course} onChange={(e) => { setCourse(e.target.value) }} placeholder="Degree/Stream" />
                <input type="text" value={institute} onChange={(e) => { setInstitute(e.target.value) }} placeholder="University/School" />
                <input type="text" value={lastYear} onChange={(e) => { setLastYear(e.target.value) }} placeholder="End year" />
              </form>
              <div className="btnContainer">
                <Button variant="contained" onClick={sendEducationData} >add</Button>
              </div>
            </div>
          </div>
        </div >
        <div id="accountContent" className="hide">
          <div className="accountSettings">
            <h1>Change Password</h1>
            <form>
              <input type={isChecked ? "text" : "password"} placeholder="New Password" />
              <input type={isChecked ? "text" : "password"} placeholder="Confirm Password" />
              <label><input type="checkbox" checked={isChecked} onChange={() => { setIsChecked(!isChecked) }} />Show Passwords</label>
            </form>
            <div className="btnContainer">
              <Button variant="contained">Change</Button>
            </div>
          </div>
        </div>
        <div id="historyContent" className="hide">
          <div className="jobHistoryContainer">
            <h1>Applied Jobs</h1>
            <div className="appliedJobsContainer">
              {appliedJobs?.map((data) => (
                <Link key={data._id} to={`/viewJob/${data._id}`} >
                  <MainJobCard key={data._id} jobData={data} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {props.userData?.userData.role === "employer" ?
          <div id="postedJobs" className="postedJobs">
            <h1>Posted Jobs</h1>
            <div className="postedJobsMainContainer">
              {postedJobs?.map((data) => {
                return (
                  <div key={data._id} className="jobWithDetails" >
                    <MainJobCard key={data._id} jobData={data} />
                    <div className="applicantsContainer">
                      {data.applicants.length>=1?<h4>Applicants</h4>:<h4>No Applicants yet</h4>}
                      <ol type="1">
                        {data.applicants?.map((appli) => {
                          return (
                            <li key={appli._id}><p><span><strong>Applicant(username): </strong>{appli.username}</span>&nbsp;&nbsp;&nbsp;<span><strong>Applicant Profile: </strong><Link to={appli.profile} target="_blank" >View Here</Link></span></p></li>
                          )
                        })}
                      </ol>
                    </div>
                  </div>
                )
              })}
            </div>
          </div> : ""}
        <div id="helpContent" className="hide">
          <div>HELP CONTENT</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
