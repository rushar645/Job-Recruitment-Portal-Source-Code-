const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: {type: String,required: true},
  companyLogo: {type: String,required: true},
  jobTitle: {type: String,required: true},
  jobType: {type: String,required: true},
  category: {type: String,required: true},
  jobDescription:{type: String,required: true},
  experience: {type: String,required: true},
    expectedSalary: { type: String, required: true },
    skills: [String],
    applicants: [{
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        profile: {type: String,required: true,unique:true}
    }]
});

const jobModel = mongoose.model("jobList", jobSchema);

module.exports = jobModel;
