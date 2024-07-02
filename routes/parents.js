const express = require("express");
const { execMap } = require("nodemon/lib/config/defaults");
const router = express.Router();

const parentController = require("../controller/parentController");
const { updateMany } = require("../models/parentdb");

router.post("/create", parentController.SignUp);

router.post("/login", parentController.SignIn);
router.post(
  "/updateParentInfo/:id",
  parentController.upload.single("image"),
  parentController.updateParentInfo
);
router.delete("/deleteAccount/:id", parentController.deleteAccount);
router.post("/forgot-password", parentController.forgotPassword);
router.post("/reset-password/:token", parentController.resetPassword);

module.exports = router;
