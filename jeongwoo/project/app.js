const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const { Task } = require('./models/Task');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))

app.listen(3000, () => {
  console.log('Connected 3000 port!');
});
app.set('views', './view');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('/index : 인덱스 페이지 /tasks : 투두리스트 페이지');
});

app.get('/index', (req, res) => {
  res.render('index');
});

// task create
app.post('/tasks', (req, res) => {
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
});

// task read all
app.get('/tasks', (req, res) => {
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
});

// task read one
app.get('/tasks/:taskId', (req, res) => {
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
})
