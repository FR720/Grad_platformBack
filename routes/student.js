const express = require('express');
const router = express.Router();

const control = require('../controller/studentController');


router.post('/signup', control.StudentSignup );//tested OK
router.post('/signIn', control.StudentSignIn);//tested OK
router.post('/react', control.reactOnPost );//tested OK
router.post('/comment', control.commentOnPost );
router.get('/posts/:subjectName',control.getPostsBySubject);//tested OK
router.post('/registersubject', control.registerSubjectByName);//tested OK
router.get('/allsubjects/:acadmicYear',control.getAllSubjects);//tested OK
router.get('/mysubject/:studentMail',control.getSubjectsByStudent);//tested OK
router.get('/myMatrial/:studentMail',control.getMatrialByStudent);//teste OK




module.exports = router;