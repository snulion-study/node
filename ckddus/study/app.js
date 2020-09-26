var express = require('express');
var app = express();
app.set('view engine', 'jade');
app.set('views', './views'); //jade default로 views/ 찾아줘서 안써도 되긴 함.
app.use(express.static('public'));
app.get('/template', function (req, res) {
  res.render('temp');
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
