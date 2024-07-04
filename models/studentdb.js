const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  parentName: {
    type: String,
    required: true,
    trim: true
  },
  parentMail: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/ 
  },
  parentPassword: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  },
  parentAge: {
    type: Number,
    required: false,
    min: 1,
    max: 99
  },
  parentPhoneNumber: {
    type: String,
    required: false,
    minlength: 11,
    maxlength: 15,
    trim: false
  },
  profilePictureUrl: {
    type: String,
    required: false,
    trim: true
  },
  resetToken: {
    type: String,
    required: false,
    trim: true,
  },
  resetTokenExpiration: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Teacher', TeacherSchema);
