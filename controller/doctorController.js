const Student = require("../models/SubjectDB");
const Posts = require('../models/PostsDB');
const Subject = require('../models/SubjectDB');
const Doctor = require('../models/DoctorDB');
const Matrial = require('../models/MatrialDB')

const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Initialize multer with storage options
const upload = multer({ storage: storage });

const DoctorSignup = async (req, res, next) => {
    const { mail, name, password } = req.body;
  
    try {
      const existingDoctor = await Doctor.findOne({ doctorMail: mail });
      if (existingDoctor) {
        return res.status(409).json({
          doctor: {
            status: 'Mail already exists',
          },
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newDoctor = new Doctor({
        doctorMail: mail,
        doctorName: name,
        doctorPassword: hashedPassword,
      });
      await newDoctor.save();
      res.status(200).json({
        doctor: {
          status: 'Account was created successfully',
        },
      });
    } catch (error) {
      console.error('Error in DoctorSignup:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message,
      });
    }
  };
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
  const { doctorMail, subjectName, title, content } = req.body;
  const { file } = req;

  try {
    const doctor = await Doctor.findOne({ doctorMail });

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }

    const newPost = new Posts({
      doctorMail,
      subjectName,
      title,
      content,
      image:file.path,

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
  const { doctorMail } = req.params; 

  try {
    // Check if the doctor exists
    const doctor = await Doctor.findOne({ doctorMail });

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }


    const posts = await Posts.find({ doctorMail });

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
  const { doctorMail, academicYear, subjectName, MatrialID } = req.body;

  try {
    const doctor = await Doctor.findOne({ doctorMail });

    if (!doctor) {
      return res.status(404).json({
        message: 'Doctor not found',
      });
    }
    const newSubject = new Subject({
      doctorMail,
      academicYear,
      subjectName,
      MatrialID, 
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
      error: error.message==="E11000 duplicate key error collection: test.subjects index: subjectName_1 dup key: { subjectName: \"math\" }"?"subjectname is alerady exist":error.message,
    });
  }
};

const getSubjectsByDoctorEmail = async (req, res, next) => {
    const { doctorMail } = req.params; 
  
    try {
      const doctor = await Doctor.findOne({ doctorMail });
  
      if (!doctor) {
        return res.status(404).json({
          message: 'Doctor not found',
        });
      }
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
    const { subjectName } = req.params;
    const {doctorMail } = req.body;
    const { file } = req;

    try {
        // Check if the subject exists by subjectName, not _id
        const subject = await Subject.findOne({ subjectName });

        if (!subject) {
            return res.status(404).json({
                message: 'Subject not found',
            });
        }
    const existingDoctor = await Doctor.findOne({ doctorMail })
    console.log("🚀 ~ uploadMaterial ~ existingDoctor:", existingDoctor)
    
      if (!existingDoctor) {
        return res.status(404).json({
          doctor: {
            status: 'Doctor Not Found',
          },
        });
      }
        // Create a new material record
        console.log(file.path)
        console.log(subjectName)
        const matrial = new Matrial({
            subjectNameM: subjectName,
            matrialPath: file.path,
            doctorMailM:doctorMail
        });
        console.log("ggggg",matrial)
        // Save the material record
        await matrial.save();

        res.status(200).json({
            message: 'Material (PDF) uploaded successfully',
            matrial,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
};

const getmatrialByDoctorMailFromMatrial = async (req, res, next) => {
    const { doctorMail } = req.params;

    try {
        // Find all materials with the given doctorMail
        const materials = await Matrial.find({ doctorMailM:doctorMail });
        console.log("🚀 ~ getmatrialByDoctorMailFromMatrial ~ materials:", materials)

        // Check if any materials were found
        if (!materials || materials.length === 0) {
            return res.status(404).json({ message: "No materials found for this doctor" });
        }

        // Prepare subject information based on the found materials
        const subjectInfo = materials.map(material => ({
            subjectName: material.subjectNameM,
            matrialPath: material.matrialPath,
        }));

        // Respond with the doctorMail and subject information
        res.status(200).json({
            doctorMail: doctorMail,
            subjects: subjectInfo,
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
    DoctorSignup,
  DoctorSignIn,
  // updateDoctorInfo,
  // deleteDoctorAccount,
  createPost,
  getPostsByDoctorEmail,
  createSubject,
  getSubjectsByDoctorEmail,
  uploadMaterial,
  getmatrialByDoctorMailFromMatrial,
  upload,
};
