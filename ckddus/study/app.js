var express = require('express');
var app = express();
app.locals.pretty = true;
const bodyParser = require('body-parser');

// mongodb+srv://ckddus:<password>@cluster0.rovek.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority

const mongoose = require('mongoose');
const config = require('./config/key');
mongoose
.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err));
app.use(bodyParser.json());

const { User } = require('./models/User');

app.post('/register', (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.set('view engine', 'jade');
app.set('views', './views'); //jade default로 views/ 찾아줘서 안써도 되긴 함.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/form', function (req, res) {
  res.render('form');
});
app.get('/form_receiver', function (req, res) {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ',' + description);
});
// Why use POST?
// get은 url상에 내 정보가 표시되며
// 너무 많은 정보를 url에 담으면 짤릴 위험이 있다.
// 따라서 이러한 경우에 'post'를 사용한다.
// post: body-parser 라는 middleware를 사용해야 한다.
// req.body.~~를 사용한다.
app.post('/form_receiver', function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ',' + description);
  res.send('Hello, POST');
});
app.get('/topic/:id', function (req, res) {
  var topics = ['Javascript is...', 'Nodejs is...', 'Express is...'];
  var output = `
    <a href="/topic/0">Javascript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
  `;
  res.send(output);
});
app.get('topic/:id/:mode', function (req, res) {
  res.send(req.params.id + ',' + req.params.mode);
});
app.get('/template', function (req, res) {
  res.render('temp', { time: Date(), _title: 'Jade' });
});
// get: router 라고 부른다.
app.get('/', function (req, res) {
  res.send('Hello home page');
});
app.get('/dynamic', function (req, res) {
  var lis = '';
  for (var i = 0; i < 5; i++) {
    lis = lis + '<li>coding</li>';
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
	<html>
		<head>
			<meta charset="utf-8">
			<title></title>
		</head>
		<body>
			Hello, Dynamic!
			<ul>
			${lis}
			</ul>
			${time}
		</body>
	</html>`;
  res.send(output);
});
app.get('/route', function (req, res) {
  res.send('Hello Router, <img src="/route.png" alt="no image">');
});
app.get('/login', function (req, res) {
  res.send('<h1>Login Please</h1>');
});
app.listen(3000, function () {
  console.log('Connected 3000 port!');
});
