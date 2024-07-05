const express = require("express");
const { execMap } = require("nodemon/lib/config/defaults");
const router = express.Router();

const controller = require("../controller/doctorController");




router.post("/signin", controller.DoctorSignIn);
router.post("/createPost", controller.createPost);
router.get("/posts", controller.getPostsByDoctorEmail);
router.post("/addsubject", controller.createSubject);
router.get("/posts", controller.getPostsByDoctorEmail);
router.get("/subject", controller.getSubjectsByDoctorEmail);
router.post("/upload", controller.uploadMaterial);

module.exports = router;
