import React from "react";
import "./createJobPost.css";
import { useState } from "react";
import Button from "@mui/material/Button";


const btnHoverSx = {
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#000",
    color: "#fff",
  },
};

function CreateJobPost() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [experience, setExperience] = useState("");
  const [expectedCtc, setExpectedCtc] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send form data to server
    const formData = {
      jobTitle,
      companyName,
      jobLocation,
      jobType,
      skillsRequired,
      experience,
      expectedCtc,
      jobDescription,
    };
    console.log(formData);
    // Reset form fields
    setJobTitle("");
    setCompanyName("");
    setJobLocation("");
    setJobType("");
    setSkillsRequired("");
    setExperience("");
    setExpectedCtc("");
    setJobDescription("");
  };

  return (
    <div className="mainOuterContainer">
      <div className="mainInnerContainer">
        <div className="formHeaderContainer">
          <h1>Create Job Post</h1>
        </div>
        <div className="formFieldsContainer">
          <form onSubmit={handleSubmit}>
            <label>
              Job Title:
              <input
                type="text"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="Job Title"
              />
            </label>
            <label>
              Company Name:
              <input
                type="text"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="Company Name"
              />
            </label>
            <label>
              Job Location:
              <input
                type="text"
                value={jobLocation}
                onChange={(event) => setJobLocation(event.target.value)}
                placeholder="Job Location"
              />
            </label>
            <label>
              Job Type:
              <select
                value={jobType}
                onChange={(event) => setJobType(event.target.value)}
                placeholder="Job Type"
                className="selectField"
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
                placeholder="Skills Required"
              />
            </label>
            <label>
              Experience:
              <input
                type="text"
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                placeholder="Experience needed"
              />
            </label>
            <label>
              Expected CTC:
              <input
                type="text"
                value={expectedCtc}
                onChange={(event) => setExpectedCtc(event.target.value)}
                placeholder="Suggested CTC"
              />
            </label>
            <label>
              Job Description:
              <textarea
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Job Description"
              />
            </label>
            <Button variant="contained" sx={btnHoverSx} >Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJobPost;
