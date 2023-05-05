const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String},
  gender: { type: String},
  dreamRole: { type: String},
  skills: [{type: String}],
  portfolioLink: { type: String},
  dob: { type: String},
  profileImg: { data: Buffer, contentType: String},
  userAddress: { type: String},
  linkedin: { type: String},
  projects: [{
    projectTitle: String,
    projectLink: String,
    skillsUsed: [{type:String}]
  }],
  experience: [{
    designation: String,
    company: String,
    duration: String
  }],
  education: [{
    course: String,
    institute: String,
    lastYear: String
  }],
  Email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationStatus: { type: Boolean, required: true },
  role: { type: String, required: true }
});

const userModel = mongoose.model("userList", userSchema);

module.exports = userModel;
