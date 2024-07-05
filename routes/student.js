const express = require('express');
const router = express.Router();

const control = require('../controller/studentController');


router.post('/signup', control.StudentSignup );//tested OK
router.post('/signIn', control.StudentSignIn);//tested OK
router.post('/react', control.reactOnPost );
router.post('/comment', control.commentOnPost );
router.post('/reactoncomment', control.reactOnComment);
router.post('/registersubject', control.registerSubjectByName);
router.get('/allsubjects',control.getAllSubjects);
router.get('/posts',control.getPostsBySubjects);
router.get('/mysubject',control.getSubjectsByStudent);




module.exports = router;