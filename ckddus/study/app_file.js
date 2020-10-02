// 웹 어플리케이션을 "file"에 저장하는 방식으로 구성.
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
const config = require('./config/key');
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));
const { User } = require('./models/User');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
app.set('views', 'views_file');
app.set('view engine', 'jade');
app.get('/topic/new', function (req, res) {
  fs.readdir('data', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', { topics: files });
  });
});
app.post('/topic', function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/' + title, description, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/' + title);
  });
});
app.get(['/topic', '/topic/:id'], function (req, res) {
  fs.readdir('data', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if (id) {
      fs.readFile('data/' + id, 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', { topics: files, title: id, description: data });
      });
    } else {
      res.render('view', {
        topics: files,
        title: 'Welcome',
        description: 'hello~~!~js for server',
      });
    }
  });
});
app.listen(3000, function () {
  console.log('Connected to 3000 port!');
});
