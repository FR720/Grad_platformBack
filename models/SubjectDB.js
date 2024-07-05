const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {

    doctorMail: {
      type: String,
      required: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/ 
    },
    academicYear: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    subjectName: {
      type: String,
      required: true,
      unique:true,
    },
   
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Subject", SubjectSchema);
