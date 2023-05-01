import { Button } from "@mui/material";
import "./viewJobPost.css";
import {Link,useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from 'axios';

const ViewJobPost = () => {
  // const { id } = useParams();

  // Add code here to fetch the job details from your server
  // You can use the `id` parameter to fetch the specific job post
  const userid=useParams();
  const [jobData,setJobData]=useState({});

  console.log("VIEW JOB: ",userid.id);
  const hoverBtnSx = {
    textTransform: "capitalize",
    width: "15%",
    backgroundColor: "#2151f9",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: "#000",
      color: "#fff",
    },
  };

  const job = {
    id: 1,
    title: 'Software Engineer',
    companyName: "CareerMeet Inc.",
    companyLogo: require("./../static/images/dummyLogo.png"),
    companyWebsite: "https://somethingsomething.com",
    recruiter: "PST",
    category: "Engineering",
    experience: 5,
    location: 'San Francisco, CA',
    salary: '12',
    skills: ["NodeJs", "React", "html", "css", "Python", "Data Structures", "Problem Solving"],
    education: "B.Tech(CS)/MCA",
    contact: "purushartha3011@gmail.com",
    benefits: "Trainings, Transportation Allowance, Team Outings, Health Insurance",
    officeHours: "10am - 6pm",
    companyAddress: "Kashipur",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lobortis scelerisque neque, ut suscipit sapien vestibulum at. Sed eget quam ac ex bibendum tristique eu ut justo. Fusce facilisis ipsum vel lacus blandit, non pharetra magna malesuada. Integer sed ex libero. Fusce id tristique sapien. Ut congue vestibulum risus, vitae ultrices elit accumsan non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In porta pellentesque ipsum, quis hendrerit diam lacinia ac. Vestibulum laoreet leo felis, vel interdum arcu consectetur nec. Proin vel ante velit. Aenean aliquet posuere felis, nec finibus lorem auctor eget.'
  };

  useEffect(()=>{
    const getJobData=async()=>{
      let res=await axios.post(`/api/viewJob/${userid.id}`).then((response)=>{return response.data}).catch((err)=>{console.log(err)})
      setJobData(res.jobData);
    }
    getJobData();
  },[userid.id]);
  console.log("Job Data: ",jobData)

  return (
    <div className="viewJobMainContainer" key={jobData._id}>
      <div className="leftJobSection">
        <div className="jobTitle">
          <h1>
            {jobData.jobTitle}
          </h1>
          <h3>{jobData.companyName}</h3>
          <h4>{jobData.jobLocation}</h4>
          <div className="jobAttributes">
            <p><strong>Category: </strong>{jobData.category}&nbsp;</p>
            <p><strong>Education: </strong>{jobData.education}&nbsp;</p>
            <p><strong>Experience required: </strong>{job.experience}&nbsp;{jobData.experience > 1 ? "yrs" : "yr"}</p>
            <p><strong>Salary: </strong>{jobData.expectedCtc}&nbsp;LPA</p>
            <p><strong>Benefits: </strong>{jobData.benefits}&nbsp;</p>
            <p><strong>Shift-Timings: </strong>{jobData.shift}&nbsp;</p>
            <span className="jobSkillsSection"><p><strong>Skills Required:</strong> </p>
              {/* {jobData.skillsRequired.map((skill) => (
                <div className="skillContainer">
                  {skill}
                </div>
              ))} */}
            </span>
            <div className="actionBtnGroup">
              <Button variant="contained" sx={hoverBtnSx}>Apply</Button>
              <Button variant="contained" sx={hoverBtnSx}>Save</Button>
            </div>
          </div>
        </div>  
        <div className="jobDetails">
          <h2>Job Description:</h2>
          <p>{jobData.jobDescription}</p>
        </div>
      </div>
      <div className="rightCompanySection">
        <div className="companyHeaders">
          <img src={job.companyLogo} alt={jobData.companyName} />
          <h2>{job.companyName}</h2>
        </div>
        <div className="companyDetails">
          <p><strong>Address: </strong>{jobData.address}&nbsp;</p>
          <p><strong>Recruiter: </strong>{job.recruiter}&nbsp;</p>
          <p><strong>Contact Info: </strong>{job.contact}&nbsp;</p>
          <p><strong>About Company: </strong>&nbsp;<Link to={jobData.companyWebsite} target="_blank">Visit Website</Link>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

export default ViewJobPost;