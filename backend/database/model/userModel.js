const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationStatus: { type: Boolean, required: true },
  role: { type: String, required: true }
});

const userModel = mongoose.model("userList", userSchema);

module.exports = userModel;
