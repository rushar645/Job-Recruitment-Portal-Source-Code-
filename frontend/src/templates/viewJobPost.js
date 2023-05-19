import { Button } from "@mui/material";
import "./viewJobPost.css";
import {Link,useParams, useNavigate} from "react-router-dom";
import {useEffect,useState} from "react";
import axios from 'axios';
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewJobPost = () => {
  // const { id } = useParams();

  // Add code here to fetch the job details from your server
  // You can use the `id` parameter to fetch the specific job post
  const userid=useParams();
  const [jobData,setJobData]=useState({});
  const [jobDesc,setJobDesc]=useState([]);
  const [jobSkills,setJobSkills]=useState([]);
  const [companyLogo,setCompanyLogo]=useState();

  const navigate=useNavigate();


  const hoverBtnSx = {
    textTransform: "capitalize",
    width: "20%",
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


  const applyForJob=async(e)=>{
    let currUserId=JSON.parse(sessionStorage.getItem("user"));
    console.log(currUserId);
    if(currUserId===null){
      navigate("/login");
      return false;
    }else{
      currUserId=currUserId.userData._id;
    }
    let currUserData={'userID':currUserId};
    let url=`/api/applyJob/${userid.id}`;
    // console.log(currUserData);
    let res= await axios.post(url,currUserData);

    if(res.status===227){
      console.log("Request Done")
    }
    else if(res.status===228){
      toast.info("Already Applied!.", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
    }

  }

  let url=`/api/viewJob/${userid.id}`;
  useEffect(()=>{
    const getJobData=async()=>{
      let res=await axios.get(url);
      setJobData(res.data.jobData);
      setJobDesc(res.data.jobData.jobDescription.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
      setJobSkills(res.data.jobData.skillsRequired);

      // let bloburl=new Blob(res.data.jobData.companyLogo.data.data,{type: "image/png"});
      // let base64=`data:image/png;base64,${bloburl}`;

      setCompanyLogo(Buffer.from(res.data.jobData.companyLogo.data,'binary').toString('base64'));
    }
    getJobData();

  },[url]);

  // console.log("Job Data: ",jobData,companyLogo);

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
              {jobSkills.map((skill,key=0) => (
                <div key={key++} className="skillContainer">
                  {skill}
                </div>
              ))}
            </span>
            <div className="actionBtnGroup">
              <Button variant="contained" sx={hoverBtnSx} onClick={applyForJob} >Apply</Button>
            </div>
          </div>
        </div>
        <div className="jobDetails">
          <h2>Job Description:</h2>
          <p dangerouslySetInnerHTML={{__html: jobDesc}}></p>
        </div>
      </div>
      <div className="rightCompanySection">
        <div className="companyHeaders">
          <img src={`data:image/png;base64,${companyLogo}`} alt={jobData.companyName} />
          <h2>{jobData.companyName}</h2>
        </div>
        <div className="companyDetails">
          <p><strong>Address: </strong>{jobData.address}&nbsp;</p>
          <p><strong>Recruiter: </strong>{jobData.recruiter}&nbsp;</p>
          <p><strong>Contact Info: </strong>{jobData.companyEmail}&nbsp;</p>
          <p><strong>About Company: </strong>&nbsp;<Link to={jobData.companyWebsite} target="_blank">Visit Website</Link>&nbsp;</p>
        </div>
      </div>
    </div>
  );
}

export default ViewJobPost;