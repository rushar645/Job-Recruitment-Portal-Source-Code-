const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {type: String,required: true},
  address: {type: String, required: true},
  companyWebsite:{type: String, required: true},
  companyLogo: {type: String,required: true},
companyEmail: {type: String, required: true},
  jobTitle: {type: String,required: true},
  jobType: {type: String,required: true},
  category: {type: String,required: true},
  jobLocation:{type: String, required: true},
  jobDescription:{type: String,required: true},
  experience: {type: String,required: true},
    expectedCtc: { type: String, required: true },
    skillsRequired: [String],
    benefits: {type: String, required: true},
    shift: {type: String, required: true},
    recruiter: {type: String,required: true},
    applicants: [{
        username: { type: String },
        email: { type: String },
        profile: {type: String}
    }]
});

const jobModel = mongoose.model("jobList", jobSchema);

module.exports = jobModel;
