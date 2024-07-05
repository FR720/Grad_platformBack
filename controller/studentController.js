const Student = require("../models/studentdb");
const DPosts = require('../models/PostsDB');
const Subject = require('../models/SubjectDB');
const bcrypt = require("bcrypt");

const StudentSignup = async (req, res, next) => {
  const { mail, name, password, acadmicyear, age, phoneNumber } = req.body;

  try {
    const existingStudent = await Student.findOne({ studentMail: mail });
    
    if (existingStudent) {
      if(password.length<6)
        {
          return res.status(500).json({
            student: {
              status: "password is less than 6 char",
            },
          });
        }
      return res.status(409).json({
        student: {
          status: "mail already exists",
        },
      });
    }
     
    const hash = await bcrypt.hash(password, 10);
    console.log(res,"res")
    const newStudent = new Student({
      studentMail: mail,
      studentName: name,
      studentPassword: hash,
      studentAcadmicYear: acadmicyear,
      studentAge: age,
      studentPhoneNumber: phoneNumber,
    });
    await newStudent.save();

    res.status(200).json({
      student: {
        status: "Account was created successfully",
      },
    });
  } catch (error) {
    console.error("Error in StudentSignup:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const StudentSignIn = async (req, res, next) => {
  const { mail, password } = req.body;

  try {
    const student = await Student.findOne({ studentMail: mail }).select(
      "_id studentName studentMail studentAge studentPhoneNumber studentAcadmicYear studentSubjects studentPassword"
    );

    if (!student) {
      return res.status(404).json({
        student: {
          status: "Wrong mail",
        },
      });
    }

    const passwordMatch = await bcrypt.compare(password, student.studentPassword);

    if (passwordMatch) {
      return res.status(200).json({
        student: {
          status: "Correct password",
          ID: student._id,
          name: student.studentName,
          mail: student.studentMail,
          age: student.studentAge,
          phoneNumber: student.studentPhoneNumber,
          acadmicYear: student.studentAcadmicYear,
          submittedSubjects: student.studentSubjects,
          isAdmin: false
        },
      });
    } else {
      return res.status(404).json({
        student: {
          status: "Wrong password",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// const StudentUpdateInfo = async function (req, res, next) {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) return res.status(400).send("no student with this id");

//     const updatedData = { ...req.body };
//     await Student.findByIdAndUpdate(req.params.id, updatedData, {
//       new: true,
//     })
//       .then((result) => res.status(200).send(result))
//       .catch((err) => res.status(500).send(err));
//   } catch (err) {
//     res.status(500).send(err);
//   }

//   // Student.findOne({ _id: req.params.id })
//   //   .then((student) => {
//   //     Student.findOne({ studentUserName: req.body.newusername })
//   //       .then((result) => {
//   //         if (result && result._id != req.params.id) {
//   //           res.status(404).json({
//   //             message: "Username already exists",
//   //           });
//   //         } else {
//   //           const studentInfo = {
//   //             studentUserName: req.body.newusername,
//   //             studentName: req.body.newname,
//   //             studentGrade: req.body.newStudentGrade,
//   //             // studentPic: req.file.path,
//   //           };
//   //           console.log(studentInfo)

//   //           Student.updateOne({ _id: req.params.id }, studentInfo)
//   //             .then(() => {
//   //               res.status(202).json({
//   //                 message: "Updated successfully",
//   //               });
//   //             })
//   //             .catch((err) => {
//   //               res.status(404).json({
//   //                 message: err,
//   //               });
//   //             });
//   //         }
//   //       })
//   //       .catch((err) => {
//   //         res.status(404).json({
//   //           message: "Error finding username",
//   //         });
//   //       });
//   //   })
//   //   .catch((err) => {
//   //     res.status(404).json({
//   //       message: "Error finding student ID",
//   //     });
//   //   });
// };

// const UpdatePassword = function (req, res, next) {
//   Student.findById(req.params.id)
//     .then((student) => {
//       if (!student) {
//         return res.status(404).json({
//           massage: "error in student id",
//         });
//       }
//       bcrypt
//         .hash(req.body.newpassword, 10)
//         .then((hash) => {
//           student.studentPassword = hash;
//           student
//             .save()
//             .then(() => {
//               res.status(202).json({
//                 message: "password updated successfully",
//               });
//             })
//             .catch((err) => {
//               res.status(404).json({
//                 message: err,
//               });
//             });
//         })
//         .catch((err) => {
//           res.status(404).json({
//             message: err,
//           });
//         });
//     })
//     .catch((err) => {
//       res.status(404).json({
//         message: "error in student id",
//       });
//     });
// };

// const deleteAccount = function (req, res, next) {
//   Student.findOneAndDelete({ _id: req.params.id })
//     .then((resualt) => {
//       res.status(202).json({
//         massage: "account sucssufully deleted",
//       });
//     })
//     .catch((err) => {
//       res.status(404).json({
//         massage: err,
//       });
//     });
// };

const getPostsBySubjects = async (req, res, next) => {
  const { subjectNames } = req.body; // Assuming subjectNames is an array of subject names

  try {
    // Query database for posts with subjectNames in the array
    const posts = await DPosts.find({ subjectName: { $in: subjectNames } });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const reactOnPost = async (req, res, next) => {
  const { postId, userId, reaction } = req.body; // Assuming postId, userId, and reaction (like/dislike) are provided
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const existingReaction = post.reacts.find(react => react.userId.toString() === userId && react.reaction === reaction);
    if (existingReaction) {
      return res.status(400).json({ message: 'User has already reacted this way on the post' });
    }
    post.reacts.push({ userId, reaction });
    await post.save();
    res.status(200).json({ message: 'Reaction added successfully' });
  } catch (error) {
    console.error('Error reacting on post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const commentOnPost = async (req, res, next) => {
  const { postId, userId, content } = req.body; // Assuming postId, userId, and content are provided
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const newComment = {
      userId,
      content,
      reacts: [] 
    };
    post.comments.push(newComment);
    await post.save();
    res.status(200).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    console.error('Error commenting on post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const reactOnComment = async (req, res, next) => {
  const { postId, commentId, userId, reaction } = req.body; // Assuming postId, commentId, userId, and reaction (like/dislike) are provided

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const existingReaction = comment.reacts.find(react => react.userId.toString() === userId && react.reaction === reaction);
    if (existingReaction) {
      return res.status(400).json({ message: 'User has already reacted this way on the comment' });
    }
    comment.reacts.push({ userId, reaction });
    await post.save();
    res.status(200).json({ message: 'Reaction added successfully' });
  } catch (error) {
    console.error('Error reacting on comment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find({});
    res.status(200).json({ subjects });
  } catch (error) {
    console.error('Error fetching all subjects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const registerSubjectByName = async (req, res, next) => {
  const { subjectName } = req.body; // Assuming subjectName is provided
  try {
    const existingSubject = await Subject.findOne({ subjectName });
    if (existingSubject) {
      return res.status(400).json({ message: 'Subject already registered' });
    }
    const newSubject = new Subject({ subjectName });
    await newSubject.save();
    res.status(200).json({ message: 'Subject registered successfully', subject: newSubject });
  } catch (error) {
    console.error('Error registering subject:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getSubjectsByStudent = async (req, res, next) => {
  const { studentMail } = req.body; 
  try {
    const subjects = await Subject.find({ studentMail });
    res.status(200).json({ subjects });
  } catch (error) {
    console.error('Error fetching subjects by student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = {
   StudentSignIn,
   StudentSignup,
  // StudentUpdateInfo,
  //  UpdatePassword,
  //  deleteAccount,
  getPostsBySubjects,
  reactOnPost,
  commentOnPost,
  reactOnComment,
  getAllSubjects,
  registerSubjectByName,
  getSubjectsByStudent,
  // upload: upload,
};
