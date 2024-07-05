const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {

    doctorMail: {
      type: String,
      required: true,
      trim: true,
      unique:true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/ 
    },
    doctorName: {
      type: String,
      required: true,
      unique:true,
      trim: true,
    },
    doctorPassword: {
      type: String,
      required: true,
      minlength: 6,
      trim: true
    },
    docotorPosts: {
      type: Array,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
