var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true; //pug로 작성 시 html 예쁘게 줄바꿈.
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));  //정적인 파일을 추가하기 위한 방법. public이라는 디렉토리를 만들고, 거기에 정적인 파일을 두면 됨. & 정적인 파일은 내용을 변경하면 바로 반영시킬 수 있음.
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/form', function(req,res){
	res.render('form');
})

//get방식으로 전송한 데이터는 req에 들어있는 객체-query객체에 들어있는-title/des~에서 데이터 받기
// app.get('/form_receiver', function(req,res){
// 	var title = req.query.title;
// 	var description = req.query.description;
// 	res.send(title+','+description);
// })

//post방식으로 전송한 데이터는 query가 아니라 body에서 받기. body-parser.
app.post('/form_receiver', function(req,res){
	var title = req.body.title;
	var description = req.body.description;
	res.send(title+','+description);
})


//get방식
app.get('/topic/:id', function(req, res){
	var topics = [
		'Javascript is....',
		'Nodejs is...',
		'Express is...'
	];
	var output = `
		<a href="/topic/0"> Javascript </a><br>
		<a href="/topic/1"> Nodejs </a><br>
		<a href="/topic/2"> Express </a><br>
		${topics[req.params.id]} 
	`//url부분의 id와 매칭됨.
	res.send(output);

	//<a href="/topic?id=2"> Express </a><br> //이런 게 query-get방식
	//topics[req.query.id]는 배열 응용
	// res.send(req.query.id+','+req.query.name); 
	////http://localhost:3000/topic?id=1&name=dahyoung url일때, 1,dahyoung라고 표현됨.
})

app.get('/topic/:id/:mode', function(req, res){
	res.send(req.params.id+','+req.params.mode)
})

app.get('/template', function(req, res){
	res.render('temp', {time:Date(), _title:'JADE'});
})
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
