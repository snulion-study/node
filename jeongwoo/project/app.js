const express = require('express');
const app = express();
app.listen(3000, () => {
  console.log('Connected 3000 port!');
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

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

const cors = require('cors');
app.use(cors({ origin: true, credentials: true, }))

app.set('views', './view');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

const task_router = require('./routes/task');
app.use('/tasks', task_router);

const user_router = require('./routes/user');
app.use('/users', user_router);