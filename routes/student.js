const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();

const control = require('../controller/studentController');


router.post('/signup', control.StudentSignup );
router.post('/signIn', control.StudentSignIn);
router.post('/react', control.reactOnPost );
router.post('/comment', control.commentOnPost );
router.post('/reactoncomment', control.reactOnComment);
router.post('/registersubject', control.registerSubjectByName);
router.get('/allsubjects',control.getAllSubjects);
router.get('/posts',control.getPostsBySubjects);
router.get('/mysubject',control.getSubjectsByStudent);




module.exports = router;