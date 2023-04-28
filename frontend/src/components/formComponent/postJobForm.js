import React, { useState } from 'react';

function JobForm() {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [experience, setExperience] = useState('');
  const [expectedCtc, setExpectedCtc] = useState('');
  const [jobDescription, setJobDescription] = useState('');

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
      jobDescription
    };
    console.log(formData);
    // Reset form fields
    setJobTitle('');
    setCompanyName('');
    setJobLocation('');
    setJobType('');
    setSkillsRequired('');
    setExperience('');
    setExpectedCtc('');
    setJobDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Job Title:
        <input type="text" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
      </label>
      <label>
        Company Name:
        <input type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
      </label>
      <label>
        Job Location:
        <input type="text" value={jobLocation} onChange={(event) => setJobLocation(event.target.value)} />
      </label>
      <label>
        Job Type:
        <select value={jobType} onChange={(event) => setJobType(event.target.value)}>
          <option value="">Select Job Type</option>
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </label>
      <label>
        Skills Required:
        <input type="text" value={skillsRequired} onChange={(event) => setSkillsRequired(event.target.value)} />
      </label>
      <label>
        Experience:
        <input type="text" value={experience} onChange={(event) => setExperience(event.target.value)} />
      </label>
      <label>
        Expected CTC:
        <input type="text" value={expectedCtc} onChange={(event) => setExpectedCtc(event.target.value)} />
      </label>
      <label>
        Job Description:
        <textarea value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default JobForm;
