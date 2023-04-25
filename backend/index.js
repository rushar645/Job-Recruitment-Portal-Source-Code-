const express = require("express");
const port = 5000;
const cors = require("cors");
const session = require("express-session");
const mongodb = require("./database/init");
const mailing = require("./services/mailing");
const userServices = require("./services/userService");
const hashServices = require("./services/hashServices");

const getAuth = require("./middlewares/getAuth");

const app = express();

app.use(cors());
app.use((req, res, next) => {
  console.log(req.method, " ", req.url);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.send("welcome!");
});

app.post("/login", async (req, res) => {
  console.log(req.body.email, req.body.password);
  let emailAdd = req.body.email;
  let pwd = req.body.password;
  let foundUser = await userServices.findUser(emailAdd);
  foundUser = foundUser[0];
  console.log(foundUser);
  if (!foundUser) {
    console.log("User not Found!");
    res.header("Access-Control-Allow-Origin");
    res.statusMessage = "User not Found! Please Signup to proceed.";
    res.status(211).end();
  } else {
    let matchPassword = await hashServices.comparePassword(
      pwd,
      foundUser.password
    );
    if (matchPassword !== true) {
      res.header("Access-Control-Allow-Origin");
      res.statusMessage = "Incorrect Password!";
      res.status(212).end();
    }
    if (foundUser && matchPassword === true) {
      req.session.isAuthenticated = true;
      req.session.username = foundUser.username;
      req.session.role = foundUser.role;
      res.header("Access-Control-Allow-Origin");
      res.statusMessage = "Login Successful!";
      res.status(210).end();
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
    res.status(213).end();
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
    res.status(209).end();
  }
});

app.get("/verify/:username", (req, res) => {
  let uname = req.params.username;
  console.log(uname);
  res.statusMessage = "Verification Completed!";
  res.status(210).end();
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
