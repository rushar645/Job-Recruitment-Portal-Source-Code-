import React from "react";
import "./createJobPost.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';


const btnHoverSx = {
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#000",
    color: "#fff",
  },
};

function CreateJobPost() {
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [benefits, setBenefits] = useState("");
  const [shift, setShift] = useState("");
  const [contact, setContact] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();

    if(jobTitle==="" || category==="" || jobLocation==="" || jobType==="" || skillsRequired==="" || education===""
    || experience==="" || expectedCtc==="" || benefits==="" || shift==="" || jobDescription==="" || contact==="" ||
    companyLogo==="" || companyName==="" || address==="" || aboutCompany===""){
      toast.warning("Please fill all the fields",{
        position: toast.POSITION.BOTTOM_CENTER,
        theme: "colored",
        className: "toast-message",
      });
      return false;
    }

    const formData = new FormData(document.myForm);
    for(var[key,value] of formData.entries()){
      console.log(key," : ",value);
    }

    let res=await axios.post("/api/postJob",formData,{headers: {'Content-Type': 'multipart/form-data'}})
    .then((response)=>{return response}).catch((err)=>{console.log(err)});
    console.log(res);
  };

  return (
    <div className="mainOuterContainer">
      <div className="mainInnerContainer">
        <div className="formHeaderContainer">
          <h1>Create Job Post</h1>
        </div>
        <div className="formFieldsContainer">
          <form id="jobPostForm" name="myForm">
            <label>
              Job Title:
              <input
                type="text"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                name="jobTitle"
                placeholder="Job Title"
                required
              />
            </label>
            <label>
              Category:
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Category"
                name="category"
                className="selectField"
                required
              >
                <option value="" className="selectOptions">Select Job Category</option>
                <option value="Engineering" className="selectOptions">Engineering</option>
                <option value="Computer-Science" className="selectOptions">Computer Science</option>
                <option value="Management" className="selectOptions">Management</option>
                <option value="Sales" className="selectOptions">Sales</option>
                <option value="Education" className="selectOptions">Education</option>
                <option value="Architecture" className="selectOptions">Architecture</option>
                <option value="Maintainence" className="selectOptions">Maintainence</option>
                <option value="Administration" className="selectOptions">Administration</option>
              </select>
            </label>

            <label>
              Job Location:
              <input
                type="text"
                value={jobLocation}
                onChange={(event) => setJobLocation(event.target.value)}
                name="jobLocation"
                placeholder="Job Location"
                required
              />
            </label>
            <label>
              Job Type:
              <select
                value={jobType}
                onChange={(event) => setJobType(event.target.value)}
                placeholder="Job Type"
                name="jobType"
                className="selectField"
                required
              >
                <option value="" className="selectOptions">Select Job Type</option>
                <option value="full-time" className="selectOptions">Full-Time</option>
                <option value="part-time" className="selectOptions">Part-Time</option>
                <option value="contract" className="selectOptions">Contract</option>
                <option value="internship" className="selectOptions">Internship</option>
              </select>
            </label>
            <label>
              Skills Required:
              <input
                type="text"
                value={skillsRequired}
                onChange={(event) => setSkillsRequired(event.target.value)}
                name="skillsRequired"
                placeholder="Eg: HTML,CSS,JS"
                required
              />
            </label>
            <label>
              Experience:
              <input
                type="text"
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                name="experience"
                placeholder="In yrs. Eg: 2"
                required
              />
            </label>
            <label>
              Education:
              <input
                type="text"
                value={education}
                onChange={(event) => setEducation(event.target.value)}
                name="education"
                placeholder="Eg: MCA/B.tech"
                required
              />
            </label>
            <label>
              Expected CTC:
              <input
                type="text"
                value={expectedCtc}
                onChange={(event) => setExpectedCtc(event.target.value)}
                name="expectedCtc"
                placeholder="In LPA. Eg: 3"
                required
              />
            </label>
            <label>
              Benefits:
              <input
                type="text"
                value={benefits}
                onChange={(event) => setBenefits(event.target.value)}
                name="benefits"
                placeholder="Benefits"
                required
              />
            </label>
            <label>
              Shift-Timing:
              <input
                type="text"
                value={shift}
                onChange={(event) => setShift(event.target.value)}
                name="shift"
                placeholder="Eg: 9am-5pm"
                required
              />
            </label>
            <label>
              Job Description:
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                name="jobDescription"
                placeholder="Job Description"
                required
              />
            </label>
            <label>
              Contact Email:
              <input
                type="text"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                name="companyEmail"
                placeholder="Benefits"
                required
              />
            </label>
            <label>
              Company Name:
              <input
                type="text"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                name="companyName"
                placeholder="Company Name"
                required
              />
            </label>
            <label>
              Company Logo:
              <input
                type="file"
                value={companyLogo}
                onChange={(event) => setCompanyLogo(event.target.value)}
                name="companyLogo"
                placeholder="Company Logo"
                accept="image/*"
                required
              />
            </label>
            <label>
              Address
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                name="address"
                placeholder="Company Address"
                required
              />
            </label>
            <label>
              Company Website:
              <input
                type="text"
                value={aboutCompany}
                onChange={(event) => setAboutCompany(event.target.value)}
                name="companyWebsite"
                placeholder="Website/Brief Introduction"
                required
              />
            </label>
            <Button type="submit" variant="contained" sx={btnHoverSx} onClick={handleSubmit} >Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJobPost;
