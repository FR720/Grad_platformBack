const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();

const control = require('../controller/studentController');
const { updateMany } = require('../models/studentdb');





router.post('/AddChild/:id', control.AddChild );
router.post('/StudentLogIn', control.StudentSignIn);
router.patch('/StudentUpdateInfo/:id', control.upload.single('image'),control.StudentUpdateInfo);
router.post('/StudentUpdatePassword/:id',control.UpdatePassword);
router.delete('/deleteStudent/:id',control.deleteAccount);




module.exports = router;