const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  studentMail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/ 
  },
  studentPassword: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  studentAge: {
    type: Number,
    required: false,
    min: 18,
    max: 99
  },
  studentPhoneNumber: {
    type: String,
    required: false,
    minlength: 11,
    maxlength: 15,
    trim: false
  },
  studentAcadmicYear: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  studentSubjects: {
    type: Array,
    ref: "Data", 
    required: false,
  },

}, {
  timestamps: true 
});

module.exports = mongoose.model('Student', StudentSchema);
