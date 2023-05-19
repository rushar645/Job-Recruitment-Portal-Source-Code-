const express = require("express");
const port = 5000;
const cors = require("cors");
const session = require("cookie-session");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
// const cookieParser = require("cookie-parser");
const mongodb = require("./database/init");
const mailing = require("./services/mailing");
const userServices = require("./services/userService");
const jobServices = require("./services/jobServices");
const blogServices = require("./services/blogServices");
const hashServices = require("./services/hashServices");

const getAuth = require("./middlewares/getAuth");


const app = express();

app.use(
  session({
    name: "session",
    secret: "somethingsomethingsomething",
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'companyLogo') {
      cb(null, './backend/uploads/companyLogos/')
    } else if (file.fieldname === 'blogImg') {
      cb(null, './backend/uploads/blogImages/')
    } else if (file.fieldname === 'profileImg') {
      cb(null, './backend/uploads/profileImages/')
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === 'companyLogo') {
      let fileExtens = file.originalname.split('.')[file.originalname.split('.').length - 1];
      let currFilename = req.body.companyName.replaceAll(' ', '_').toLowerCase() + "." + fileExtens;
      cb(null, currFilename);
    } else if (file.fieldname === 'blogImg') {
      let fileExtens = file.originalname.split('.')[file.originalname.split('.').length - 1];
      let currFilename = req.body.blogTitle.replaceAll(' ', '_').toLowerCase() + "." + fileExtens;
      cb(null, currFilename);
    } else if (file.fieldname === 'profileImg') {
      let fileExtens = file.originalname.split('.')[file.originalname.split('.').length - 1];
      let currFilename = req.session.username.replaceAll(' ', '_').toLowerCase() + "." + fileExtens;
      cb(null, currFilename);
    }
  }
});

const upload = multer({ storage: storage });

app.use(express.static("./uploads/"));


app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, " ", req.url);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/api/", async (req, res) => {
  let allJobs = await jobServices.findAllJobs();
  let allCompanies = [];
  allJobs.forEach((job) => {
    allCompanies.push({ companyName: job.companyName, companyLogo: job.companyLogo });
  });

  let allBlogs = await blogServices.findAllBlogs();
  let homeObj = {
    "jobs": allJobs.length <= 3 ? allJobs : [allJobs[0], allJobs[1], allJobs[2]],
    "companies": allCompanies.length <= 5 ? allCompanies : [allCompanies[0], allCompanies[1], allCompanies[2], allCompanies[3], allCompanies[4]],

    "blogs": allBlogs.length <= 2 ? allBlogs : [allBlogs[0], allBlogs[1]]
  }
  res.statusMessage = "Welcome!";
  res.status(222).json({ data: homeObj });
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

app.get("/api/verify/:username", async (req, res) => {
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

app.get("/api/search", async (req, res) => {
  console.log(req.query);
  let search = req.query.search;
  let category = req.query.category;
  let allJobs = await jobServices.findAllJobs();
  let foundJobs = [];
  allJobs.forEach((job) => {
    let allSkills = job.skillsRequired.map(skill => skill = skill.toLowerCase());
    if (job.jobTitle.toLowerCase() === search.toLowerCase() || job.category.toLowerCase() === category.toLowerCase() || allSkills.includes(search.toLowerCase())) {
      foundJobs.push(job);
    }
  })
  if (search === 'null' && category === 'null') {
    foundJobs = allJobs;
  }
  res.statusMessage = "Search Completed!";
  res.status(221).json({ jobs: foundJobs });
});

app.get("/api/blog", async (req, res) => {
  let allBlogData = await blogServices.findAllBlogs();

  res.statusMessage = "Blogs found";
  res.status(224).json({ blogData: allBlogData });
})

app.get("/api/login", (req, res) => { });

app.get("/api/signup", () => { });

app.get("/api/profilePage", async (req, res) => {

  let currUser = req.session.username;

  let allJobs = await jobServices.findAllJobs();

  let postedJobs = [];

  if (req.session.role === "employer") {
    postedJobs = allJobs.filter((item) => {
      return item.recruiter === currUser
    })
  }
  let appliedJobs = allJobs.filter((item) => {
    let presence = false;
    item.applicants.forEach((appli) => {
      if (appli.username === currUser) {
        presence = true;
      }
    })
    if (presence === true) {
      return item
    }
  })

  // console.log(postedJobs,apppliedJobs);
  res.statusMessage = "Data Found";
  res.status(229).json({ postedJobs: postedJobs, appliedJobs: appliedJobs })

})

app.get("/api/getUser/:id", async (req, res) => {
  let user = await userServices.findUserById(req.params.id);
  user = user[0];
  res.statusMessage = "User Found!"
  res.status(230).json(user);
})


app.get("/api/logout", (req, res) => {
  req.session = null;
  res.statusMessage = "Logout Successful";
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

app.post("/api/personalInfo", upload.single('profileImg'), async (req, res) => {
  let id = req.session.username;
  let data = JSON.parse(JSON.stringify(req.body));
  console.log(id, data, req.file);
  if (req.file) {
    data.profileImg = {
      data: fs.readFileSync(path.join(__dirname + '/uploads/profileImages/' + req.file.filename)),
      contentType: 'image/png'
    };
  }

  let foundUser = await userServices.findUserByName(id);
  foundUser = foundUser[0];

  // console.log(foundUser);

  let updatedUser = await userServices.updateDataByName(id, data);
  // console.log("this: ",updatedUser);
  res.statusMessage = "Update Successful";
  res.status(228).send();

})

app.post("/api/preferences", async (req, res) => {
  let id = req.session.username;
  let data = JSON.parse(JSON.stringify(req.body));
  console.log(id, data);
  let foundUser = await userServices.findUserByName(id);
  foundUser = foundUser[0];

  // console.log(foundUser);

  let updatedUser = await userServices.updateDataByName(id, data);
  // console.log("this: ",updatedUser);
  res.statusMessage = "Update Successful";
  res.status(228).send();
})

app.post("/api/projects", async (req, res) => {
  let id = req.session.username;
  let data = JSON.parse(JSON.stringify);
  console.log(id, data);
  let foundUser = await userServices.findUserByName(id);
  foundUser = foundUser[0];
  if (!foundUser.projects || foundUser.projects.length === 0) {
    foundUser.projects = [];
  }

  foundUser.projects = foundUser.projects.push(data);

  let updatedUser = await userServices.updateDataByName(id, foundUser);
  // console.log("this: ",updatedUser);
  res.statusMessage = "Update Successful";
  res.status(228).send();
})

app.post("/api/experience", async (req, res) => {
  let id = req.session.username;
  let data = JSON.parse(JSON.stringify(req.body));
  console.log(id, data);
  let foundUser = await userServices.findUserByName(id);
  foundUser = foundUser[0];
  if (!foundUser.experience || foundUser.experience.length === 0) {
    foundUser.experience = [];
  }

  foundUser.experience = foundUser.experience.push(data);

  let updatedUser = await userServices.updateDataByName(id, foundUser);
  // console.log("this: ",updatedUser);
  res.statusMessage = "Update Successful";
  res.status(228).send();
})

app.post("/api/education", async (req, res) => {
  let id = req.session.username;
  let data = JSON.parse(JSON.stringify(req.body));
  console.log(id, data);
  let foundUser = await userServices.findUserByName(id);
  foundUser = foundUser[0];
  if (!foundUser.education || foundUser.education.length === 0) {
    foundUser.education = [];
  }

  foundUser.education = foundUser.education.push(data);

  let updatedUser = await userServices.updateDataByName(id, foundUser);
  // console.log("this: ",updatedUser);
  res.statusMessage = "Update Successful";
  res.status(228).send();
})

app.post("/api/profile/removeItem", async (req, res) => {
  let dataId = req.body.id;
  let container = req.body.parent;
  let foundUser = await userServices.findUserByName(req.session.username);
  foundUser = foundUser[0];

  // console.log(foundUser);
  let updatedData = [];

  if (container === "education") {
    updatedData = foundUser.education.filter((item) => { if (item.id !== dataId) { return item } })
    foundUser.education = updatedData;
  } else if (container === "experience") {
    updatedData = foundUser.experience.filter((item) => { if (item.id !== dataId) { return item } })
    foundUser.experience = updatedData;
  } else if (container === "projects") {
    updatedData = foundUser.projects.filter((item) => { if (item.id !== dataId) { return item } })
    foundUser.projects = updatedData;
  }

  console.log(foundUser);

  let updateUser = await userServices.updateDataByName(req.session.username, foundUser);

  res.statusMessage = "Data Recieved";
  res.status(231).send();
})

app.post("/api/removeJob", async (req, res) => {
  let jobId = req.body.id;

  console.log(jobId);

  let removedJob = await jobServices.removeById(jobId);

  console.log(removedJob);

  res.statusMessage = "Job Removed";
  res.status(232).send();

});

app.post("/api/applyJob/:id", async (req, res) => {
  let id = req.params.id;
  let data = req.body.userID;
  console.log(id, data);
  let foundJob = await jobServices.findJob(id);
  foundJob = foundJob[0];
  let applicantData = {
    username: req.session.username,
    profile: `http://localhost:3000/viewProfile/${data}`
  }
  let presence = false;
  foundJob.applicants.forEach((item) => {
    if (item.username === applicantData.username) {
      presence = true;
    }
  })
  if (presence === false) {
    foundJob.applicants = foundJob.applicants.push(applicantData);
    console.log("Applied Job: ", foundJob)
    let updatedJob = await jobServices.updateData(id, foundJob);
    res.statusMessage = "Applied Successfully";
    res.status(227).send();
  }
  else {
    res.statusMessage = "Already Applied";
    res.status(228).send();
  }

})

app.get("/api/viewJob/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id);
  let foundJob = await jobServices.findJob(id);
  foundJob = foundJob[0];
  console.log(foundJob.jobTitle);
  res.statusMessage = "Req recieved";
  res.status(223).json({ jobData: foundJob });
})

app.get("/api/viewBlog/:id", async (req, res) => {
  let blogid = req.params.id;

  console.log(blogid)
  let foundBlog = await blogServices.findBlog(blogid);
  foundBlog = foundBlog[0];
  console.log(foundBlog);

  res.statusMessage = "Blog data sent";
  res.status(225).json({ blog: foundBlog });

})

app.post("/api/blog/createBlog", upload.single('blogImg'), async (req, res) => {
  let blog = JSON.parse(JSON.stringify(req.body));

  blog.blogImg = {
    data: fs.readFileSync(path.join(__dirname + '/uploads/blogImages/' + req.file.filename)),
    contentType: 'image/png'
  };

  blog.username = req.session.username;

  console.log(blog);

  let newBlog = await blogServices.createNewBlog(blog);
  res.statusMessage = "Blog Added!";
  res.status(224).end();

})

app.post("/api/postJob", upload.single('companyLogo'), async (req, res) => {
  let jobData = JSON.parse(JSON.stringify(req.body));
  jobData.companyLogo = {
    data: fs.readFileSync(path.join(__dirname + '/uploads/companyLogos/' + req.file.filename)),
    contentType: 'image/png'
  };
  jobData.skillsRequired = jobData.skillsRequired.split(',');
  jobData.recruiter = req.session.username;
  console.log(jobData);

  let createJob = await jobServices.createNewJob(jobData);

  res.statusMessage = "Job Created";
  res.status(220).send();
})


app.post("/api/blog", (req, res) => { });

app.post("/api/forgotpassword", async (req, res) => {
  let email = req.body.email;
  let foundUser = await userServices.findUser(email);
  if (foundUser.length === 0) {
    res.statusMessage = "Email not found.";
    res.send(236).send();
  } else {

    foundUser = foundUser[0];

    console.log(foundUser, email);

    let mail = await mailing.sendPasswordResetLink(email, foundUser.id);

    res.statusMessage = "Email Sent!";
    res.send(234).send();

  }
});

app.post("/api/resetPassword/:id", async (req, res) => {

  let pwd = JSON.parse(JSON.stringify(req.body.password));
  let id = req.params.id;
  let foundUser = await userServices.findUserById(id);

  foundUser = foundUser[0];

  const hashedPassword = await hashServices.hashPassword(pwd);

  foundUser.password = hashedPassword;

  let updatedUser = await userServices.updateDataById(id, foundUser);

  res.statusMessage = "Password Changed";
  res.status(235).send();
})

app.post("/api/changePassword", async (req, res) => {
  let pwd = JSON.parse(JSON.stringify(req.body.password));

  let foundUser = await userServices.findUserByName(req.session.username);

  foundUser = foundUser[0];
  console.log(foundUser);

  const hashedPassword = await hashServices.hashPassword(pwd);

  foundUser.password = hashedPassword;

  console.log(foundUser);

  let updatedUser = await userServices.updateDataByName(req.session.username, foundUser);

  res.statusMessage = "Password Changed";
  res.status(233).send();
})


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
