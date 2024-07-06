const express = require("express");
const { execMap } = require("nodemon/lib/config/defaults");
const router = express.Router();

const controller = require("../controller/doctorController");




router.post("/signin", controller.DoctorSignIn);//tested OK
router.post("/signup", controller.DoctorSignup);//tested OK
router.post("/createPost", controller.upload.single('postImage'), controller.createPost);//tested ok
router.get("/posts/:doctorMail", controller.getPostsByDoctorEmail);//tested OK
router.post("/addsubject", controller.createSubject);//tested OK
router.get("/subject/:doctorMail", controller.getSubjectsByDoctorEmail);//tested OK
router.post('/upload-material/:subjectName', controller.upload.single('pdfFile'), controller.uploadMaterial);//tested OK
router.get("/allmatrial/:doctorMail", controller.getmatrialByDoctorMailFromMatrial);//tested OK

module.exports = router;
