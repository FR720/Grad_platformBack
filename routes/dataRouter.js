const express = require('express');
const { execMap } = require('nodemon/lib/config/defaults');
const router = express.Router();


const control = require('../controller/dataController');
const { updateMany } = require('../models/Datadb');




router.post('/InsertData/:id',control.upload.single('image'),control.InsertData );
router.post('/TakeData/:id', control.TakeData);
router.patch('/FSEupdateQuesttion/:id',control.UpdateData);
router.delete('/FSEdeleteQuesttion/:id',control.DeleteData);
module.exports = router;
