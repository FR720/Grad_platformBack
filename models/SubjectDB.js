const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {

    doctorMail: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/ 
    },
    studentMail: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/ 
    },
    AcadmicYear: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
    },
    subjectName: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    MatrialPath: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Subject", SubjectSchema);
