const Student = require("../models/SubjectDB");
const Posts = require('../models/PostsDB');
const Subject = require('../models/SubjectDB');
const Docotr = require('../models/DoctorDB');

const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./ParentProfilePic/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}_${new Date().getTime()}.png`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 8,
  },
});



const DoctorSignIn = async (req, res, next) => {
  const { mail, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ doctorMail: mail }).select(
      '_id doctorName doctorMail doctorPosts doctorPassword'
    );

    if (!doctor) {
      return res.status(404).json({
        doctor: {
          status: 'Wrong mail',
        },
      });
    }


    const passwordMatch = await bcrypt.compare(password, doctor.doctorPassword);

    if (passwordMatch) {
      return res.status(200).json({
        doctor: {
          status: 'Correct password',
          ID: doctor._id,
          name: doctor.doctorName,
          mail: doctor.doctorMail,
          posts: doctor.doctorPosts,
          isAdmin: true
        },
      });
    } else {
      return res.status(404).json({
        doctor: {
          status: 'Wrong password',
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const updateDoctorInfo = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).send('Doctor not found');
    }

    let newData = { ...req.body };

    // Handle file upload if there's a file in the request
    if (req.file) {
      newData = { ...newData, doctorPic: req.file.path };
    }

    // Update the doctor information
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, newData, { new: true });

    if (!updatedDoctor) {
      return res.status(500).send('Error updating doctor information');
    }

    res.status(200).json(updatedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

const createPost = async (req, res, next) => {
  const { doctorMail, subjectName, title, content, image } = req.body;

  try {
    // Check if the doctor exists
    const doctor = await Doctor.findOne({ doctorMail });

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    // Create a new post
    const newPost = new Posts({
      doctorMail,
      subjectName,
      title,
      content,
      image,
      // other fields as needed
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      message: 'Post created successfully',
      post: savedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getPostsByDoctorEmail = async (req, res, next) => {
  const { doctorMail } = req.params; // Assuming the doctor's email is passed as a parameter

  try {
    // Check if the doctor exists
    const doctor = await Doctor.findOne({ doctorMail });

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    // Retrieve posts by doctor's email
    const posts = await Post.find({ doctorMail });

    res.status(200).json({
      doctor: {
        _id: doctor._id,
        name: doctor.doctorName,
        email: doctor.doctorMail,
      },
      posts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const createSubject = async (req, res, next) => {
  const { doctorMail, academicYear, subjectName, materialPath } = req.body;

  try {
    // Check if the doctor exists
    const doctor = await Doctor.findOne({ doctorMail });

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    // Create a new subject
    const newSubject = new Subject({
      doctorMail,
      academicYear,
      subjectName,
      materialPath, // Assuming materialPath is where the PDF file will be stored
      // other fields as needed
    });

    const savedSubject = await newSubject.save();

    res.status(201).json({
      message: 'Subject created successfully',
      subject: savedSubject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getSubjectsByDoctorEmail = async (req, res, next) => {
  const { doctorMail } = req.params; // Assuming the doctor's email is passed as a parameter

  try {
    // Check if the doctor exists
    const doctor = await Doctor.findOne({ doctorMail });

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    // Retrieve subjects by doctor's email
    const subjects = await Subject.find({ doctorMail });

    res.status(200).json({
      doctor: {
        _id: doctor._id,
        name: doctor.doctorName,
        email: doctor.doctorMail,
      },
      subjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const deleteDoctorAccount = async (req, res, next) => {
  try {
    const doctorId = req.params.id;
    
    // Find and delete the doctor account
    const deletedDoctor = await Doctor.findOneAndDelete({ _id: doctorId });

    if (!deletedDoctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    res.status(202).json({
      message: 'Doctor account successfully deleted',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
const uploadMaterial = async (req, res, next) => {
  const { subjectId } = req.params; // Assuming the subject ID is passed as a parameter
  const { file } = req; // Assuming the file (PDF) is uploaded via multipart/form-data

  try {
    // Check if the subject exists
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        message: 'Subject not found',
      });
    }

    // Handle file upload (save file path or buffer to storage location)
    // Example: Save file path to materialPath field in Subject model
    subject.materialPath = file.path; // Update materialPath with uploaded file path
    await subject.save();

    res.status(200).json({
      message: 'Material (PDF) uploaded successfully',
      subject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  DoctorSignIn,
  updateDoctorInfo,
  deleteDoctorAccount,
  createPost,
  getPostsByDoctorEmail,
  createSubject,
  getSubjectsByDoctorEmail,
  uploadMaterial,
  upload,
};
