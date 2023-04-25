const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  personalBlogs: [
    {
      blogtitle: { type: String, required: true, unique: true },
      blogcontent: { type: String, required: true, unique: true },
      blogImage: { type: String, required: true, unique: true },
    },
  ],
});

const blogModel = mongoose.model("blogList", blogSchema);

module.exports = blogModel;
