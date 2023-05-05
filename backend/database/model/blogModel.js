const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  username: { type: String, required: true},
  blogTitle: { type: String, required: true },
  blogContent: { type: String, required: true },
  blogImg: {
    data: Buffer,
    contentType: String
  }
});

const blogModel = mongoose.model("blogList", blogSchema);

module.exports = blogModel;
