var nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "careermeet.helpdesk@gmail.com",
    pass: process.env.senderEmailPassword,
  },
});

module.exports.sendPasswordResetLink=(sendTo,userid)=>{
  var mailOptions = {
    from: "careermeet.helpdesk@gmail.com",
    to: sendTo,
    subject: "Change your password",
    html: `Please use the link below to change password.
            <a href="http://127.0.0.1:3000/changePassword/${userid}">Click to change password</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
module.exports.sendWelcomeMail = (sendTo, username) => {
  var mailOptions = {
    from: "careermeet.helpdesk@gmail.com",
    to: sendTo,
    subject: "Welcome to CareerMeet!",
    html: `<h1>Welcome to CareerMeet!</h1><p>Hi,${username}. We would like to welcome you to our recruitment portal where you can find your dream job very easily.</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports.sendVerificationMail = (sendTo, username) => {
  var mailOptions = {
    from: "careermeet.helpdesk@gmail.com",
    to: sendTo,
    subject: "CareerMeet-Verify your account",
    html: `Hi,${username}, thanks For signing up on <b>CareerMeet</b>. Your account has been created, please verify you account using the link given below.
            <a href="http://127.0.0.1:3000/verifyAccount/${username}">Click to Verify Your Account</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
