const express = require('express');
const taskController = require('../controllers/TaskController');
const router = express.Router();
const task = require('../controllers/TaskController');


router.get('/', task.list);
router.get('/:taskId', task.find);
router.post('/', task.create);
router.delete('/:taskId', task.delete);
router.put('/:taskId', task.update);

module.exports = router;