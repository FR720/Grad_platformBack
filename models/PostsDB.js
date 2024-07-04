const mongoose = require("mongoose");
const PostsSchema = new mongoose.Schema(
  {
    TeacherEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/ 
    },
    SubjectID: {
      type: String,
      required: true,
    },
    Title: {
      type: Number,
      required: true,
    },
    Content: {
      type: [String],
      required: true,
    },
    Image: {
      type: Array,
      required: true,
    },
    Reacts: {
      type: String,
      ref: "Data", 
      required: true,
    },
    Comments: {
      type: String,
      ref: "Data", 
      required: true,
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", PostsSchema);
