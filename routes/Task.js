const express = require('express');
const router = express.Router();
const taskController = require('../controller/TaskController');



router.post('/AssignTask/:id',taskController.AssignTask );
router.get('/TakeTask/:id',taskController.TakeTask );
router.get('/tasks/:studentID', taskController.getTasksByStudentId);
router.get('/:studentID/:taskID', taskController.getTaskById);
router.post('/updateTask/:taskId/:id', taskController.updateTask);
router.delete('/deleteTask/:taskId', taskController.deleteTask);


module.exports = router;