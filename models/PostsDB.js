const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema(
  {
    teacherMail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/
    },
    subjectName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String, 
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    reacts: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      reaction: { type: String, enum: ['like', 'dislike'] }
    }],
    comments: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      reacts: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reaction: { type: String, enum: ['like', 'dislike'] }
      }],
    }],

  },
  { timestamps: true }
);

module.exports = mongoose.model('Posts', PostsSchema);


