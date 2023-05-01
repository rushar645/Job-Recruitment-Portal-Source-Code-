const express = require("express");
const port = 5000;
const cors = require("cors");
const session = require("cookie-session");
const multer=require("multer");
// const cookieParser = require("cookie-parser");
const mongodb = require("./database/init");
const mailing = require("./services/mailing");
const userServices = require("./services/userService");
const jobServices = require("./services/jobServices");
const hashServices = require("./services/hashServices");

const getAuth = require("./middlewares/getAuth");


const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'companyLogo') {
      cb(null, './backend/uploads/companyLogos/')
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'companyLogo') {
      let fileExtens = file.originalname.split('.')[file.originalname.split('.').length - 1];
      let currFilename = req.body.companyName.replaceAll(' ', '_').toLowerCase() + "." + fileExtens;
      cb(null, currFilename);
    }
  }
});

const upload=multer({storage:storage});

app.use(express.static("./uploads"));


app.use(cors());
app.use(
  session({
    name: "session",
    secret: "somethingsomethingsomething",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  })
);
app.use((req, res, next) => {
  console.log(req.method, " ", req.url);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/", async(req, res) => {
  let allJobs=await jobServices.findAllJobs();
  let allCompanies=[];
  allJobs.forEach((job)=>{
    allCompanies.push({companyName:job.companyName,companyLogo:job.companyLogo});
  });
  // let allBlogs=await blogServices.findAllBlogs();
  let homeObj={
    "jobs":allJobs.length<=4?allJobs:[allJobs[0],allJobs[1],allJobs[2],allJobs[3]],
    "companies": allCompanies.length<=6? allCompanies: [allCompanies[0],allCompanies[1],allCompanies[2],allCompanies[3],allCompanies[4],allCompanies[5]]
  }
  res.statusMessage="Welcome!";
  res.status(222).json({data:homeObj});
});

app.get("/api/getUserRoles", async (req, res) => {
  console.log(req.session.isAuthenticated);
  if (req.session.isAuthenticated) {
    let uname = req.session.username;
    let foundUser = await userServices.findUserByName(uname);
    foundUser = foundUser[0];
    res.statusMessage = "User Authenticated!";
    res.status(215).json({ userData: foundUser });
    res.end();
  } else {
    res.statusMessage = "No Authentication!";
    res.status(216).send();
  }
});

app.get("/api/verify/:username", async(req, res) => {
  let uname = req.params.username;
  console.log(uname);
  var foundData = await userServices.findUserByName(uname);
  foundData = foundData[0];
  console.log(foundData)
  foundData.verificationStatus = true;
  userServices.updateDataByName(uname, foundData);
  res.statusMessage = "Verification Completed!";
  res.status(214).end();
});

app.get("/api/search",async(req,res)=>{
    console.log(req.query);
    let search=req.query.search;
    let category=req.query.category;
    let allJobs=await jobServices.findAllJobs();
    let foundJobs=[];
    allJobs.forEach((job)=>{
      let allSkills=job.skillsRequired.map(skill=>skill=skill.toLowerCase());
      if(job.jobTitle.toLowerCase()===search.toLowerCase() || job.category.toLowerCase()===category.toLowerCase() || allSkills.includes(search.toLowerCase())){
        foundJobs.push(job);
      }
    })
    res.statusMessage = "Search Completed!";
    res.status(221).json({ jobs: foundJobs });
});

app.get("/api/login", (req, res) => { });

app.get("/api/signup", () => { });

app.get("/api/logout",(req,res)=>{
  req.session=null;
  res.statusMessage="Logout Successful";
  res.status(217).send();
})

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  let emailAdd = req.body.email;
  let pwd = req.body.password;
  let foundUser = await userServices.findUser(emailAdd);
  foundUser = foundUser[0];
  console.log("OUTER LOGIN: ");
  if (!foundUser) {
    console.log("User not Found!");
    res.header("Access-Control-Allow-Origin");
    res.statusMessage = "User not Found! Please Signup to proceed.";
    res.status(211).send();
  } else {
    let matchPassword = await hashServices.comparePassword(
      pwd,
      foundUser.password
    );
    if (matchPassword !== true) {
      res.header("Access-Control-Allow-Origin");
      res.statusMessage = "Incorrect Password!";
      res.status(212).send();
    }
    if (foundUser && matchPassword === true) {
      req.session.isAuthenticated = true;
      req.session.username = foundUser.username;
      req.session.role = foundUser.role;
      console.log(req.session);
      // req.session.save();
      res.header("Access-Control-Allow-Origin");
      res.statusMessage = "Login Successful!";
      res.status(210).send();
    }
  }
});

app.post("/api/signup", async (req, res) => {
  let username = req.body.username;
  let emailAdd = req.body.email;
  let pwd = req.body.password;
  let role = req.body.role;
  let companyEmail;
  if (role === "employer") {
    companyEmail = req.body.companyEmail;
    console.log(username, emailAdd, pwd, role, companyEmail);
  }
  console.log(username, emailAdd, pwd, role);
  let foundUser = await userServices.findUser(emailAdd);
  if (foundUser.length !== 0) {
    res.statusMessage = "Email Already in Use";
    res.status(213).send();
  } else {
    const hashedPassword = await hashServices.hashPassword(pwd);
    let userObj = {
      username: username,
      Email: emailAdd,
      password: hashedPassword,
      verificationStatus: false,
      role: role,
    };
    if (role === "employer") {
      userObj = {
        username: username,
        Email: emailAdd,
        companyEmail: companyEmail,
        password: hashedPassword,
        verificationStatus: false,
        role: role,
      };
    }
    console.log(userObj);
    await userServices.createNewUser(userObj);
    let welcome = await mailing.sendWelcomeMail(emailAdd, username);
    let verifyMail = await mailing.sendVerificationMail(emailAdd, username);
    res.statusMessage = "Signup successful!";
    res.status(209).send();
  }
});

app.post("/api/search", (req, res) => { });

app.post("/api/postJob",upload.single('companyLogo'),async(req,res)=>{
  let jobData =JSON.parse(JSON.stringify(req.body));
  jobData.companyLogo="./../../."+req.file.destination+req.file.filename;
  jobData.skillsRequired=jobData.skillsRequired.split(',');
  jobData.recruiter=req.session.username;
  console.log(jobData);

  let createJob=await jobServices.createNewJob(jobData);

  res.statusMessage="Job Created";
  res.status(220).send();
})


app.post("/api/blog", (req, res) => { });

app.post("/api/forgotpassword", (req, res) => { });

app.post("/api/profile", (req, res) => { });


const generateOTP = (len = 6) => {
  let otp = "";
  for (i = 0; i < len; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

mongodb()
  .then(() => {
    console.log("Connected to database...");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((err) => {
    console.log("Encountered an error: \n", err);
  });
