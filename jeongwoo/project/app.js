const express = require('express');
const app = express();
app.listen(3000, () => {
  console.log('Connected 3000 port!');
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
const config = require('./config/key');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))


app.set('views', './view');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.send('/index : 인덱스 페이지 /tasks : 투두리스트 페이지');
});

app.get('/index', (req, res) => {
  res.render('index');
});

const task_router = require('./routes/task');
app.use('/tasks', task_router);