var express = require('express');
var app = express();
app.use(express.static('public'));  //정적인 파일을 추가하기 위한 방법. public이라는 디렉토리를 만들고, 거기에 정적인 파일을 두면 됨. & 정적인 파일은 내용을 변경하면 바로 반영시킬 수 있음.
app.get('/', function(req, res){
	res.send('Hello home page');
});
app.get('/dynamic', function(req, res){
	var lis = '';
	for (var i=0; i<5; i++){
		lis = lis + '<li>coding</li>';
	}
	var time= Date();
	var output = 
	`<!DOCTYPE html>
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
}) // 동적 파일은 내용 변경한 후 node를 다시 실행해야, 파일 변경이 반영됨.
app.get('/route', function(req, res){
	res.send('Hello Router, <img src="/photo.png">');
})
app.get('/login', function(req, res){
	res.send('<h1>Login Please</h1>');
});
app.listen(3000, function(){
	console.log('Connected 3000 port!')
});
