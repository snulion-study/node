const mongoose = require('mongoose');
const { Task } = require('../models/Task');

const taskController = {};

taskController.list = function (req, res) {
  Task.find()
  .then(tasks => {
    res.status(200);
    res.render('todoList', {tasks: tasks});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: err
    })
  })
};

taskController.find = function (req, res) {
  const taskId = req.params.taskId;

  Task.findOne({_id: taskId})
  .then(task => {
    res.status(200);
    res.render('taskDetail', {task:task});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: err
    })
  });
};

taskController.create = function (req, res) {
  console.log(req.body);

  const task = new Task(req.body);

  task.save()
  .then(result => {
    res.redirect('/tasks');
  })
  .catch(err => {
    res.status(500).json({
      message: err
    });
    console.log(err);
  });
};

taskController.delete = function (req, res) {
  const taskId = req.params.taskId;

  Task.findByIdAndDelete(taskId)
  .then(result => {
    console.log('삭제성공');
    res.status(200).redirect('/tasks');
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: err
    })
  })
};

taskController.update = function (req, res) {
  const taskId = req.params.taskId;

  Task.findByIdAndUpdate({ _id: taskId }, { title: req.body.title, detail: req.body.detail }, { new: true })
  .then((task) => {;
    console.log('수정 성공');
    console.log(task);
    res.status(200).redirect('/tasks');
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: err
    })
  })
};

module.exports = taskController;