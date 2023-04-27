const express = require("express");
const port = 5000;
const cors = require("cors");
const session = require("cookie-session");
// const cookieParser = require("cookie-parser");
const mongodb = require("./database/init");
const mailing = require("./services/mailing");
const userServices = require("./services/userService");
const hashServices = require("./services/hashServices");

const getAuth = require("./middlewares/getAuth");

const app = express();
// app.use(cookieParser("mouse elephant"));
app.use(cors());
app.use(
  session({
    name:"session",
    secret: "somethingsomethingsomething",
    expires: new Date(Date.now() + 24*60*60*1000)
  })
);
app.use((req, res, next) => {
  console.log(req.method, " ", req.url);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  // console.log("home: ", req.session, req.sessionID);
  res.send("welcome!");
});

app.get("/getUserRoles", async (req, res) => {
  console.log(req.session.isAuthenticated);
  if (req.session.isAuthenticated) {
    let uname = req.session.username;
    let foundUser = await userServices.findUserByName(uname);
    foundUser = foundUser[0];
    res.statusMessage = "User Authenticated!";
    res.status(215).json({ userData: foundUser });
  } else {
    res.statusMessage = "No Authentication!";
    res.status(216).send();
  }
});

app.get("/verify/:username", (req, res) => {
  let uname = req.params.username;
  console.log(uname);
  var foundData = userServices.findUserByName(uname);
  foundData = foundData[0];
  foundData.verificationStatus = true;
  userServices.updateDataByName(uname, foundData);
  res.statusMessage = "Verification Completed!";
  res.status(214).end();
});

app.get("/login", (req, res) => {});

app.get("/signup", () => {});

app.post("/login", async (req, res) => {
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
      // console.log(req.session, req.sessionID);
      // req.session.save();
      res.header("Access-Control-Allow-Origin");
      res.statusMessage = "Login Successful!";
      res.status(210).send();
    }
  }
});

app.post("/signup", async (req, res) => {
  let username = req.body.username;
  let emailAdd = req.body.email;
  let pwd = req.body.password;
  let role = req.body.role;
  console.log(username, emailAdd, pwd, role);
  let foundUser = await userServices.findUser(emailAdd);
  if (foundUser.length !== 0) {
    res.statusMessage = "Email Already in Use";
    res.status(213).send();
  } else {
    const hashedPassword = await hashServices.hashPassword(pwd);
    const userObj = {
      username: username,
      Email: emailAdd,
      password: hashedPassword,
      verificationStatus: false,
      role: role,
    };
    await userServices.createNewUser(userObj);
    let welcome = await mailing.sendWelcomeMail(emailAdd, username);
    let verifyMail = await mailing.sendVerificationMail(emailAdd, username);
    res.statusMessage = "Signup successful!";
    res.status(209).send();
  }
});

app.post("/search", (req, res) => {});

app.post("/blog", (req, res) => {});

app.post("/forgotpassword", (req, res) => {});

app.post("/profile", (req, res) => {});

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
