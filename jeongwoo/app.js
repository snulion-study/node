// 메인 파일 or 메인 어플리케이션 or 엔트리 파일 : 최초 진입점의 역할
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // express라는 모듈은 사실 함수라서 이 함수를 호출하면 return 값으로 application이 나옴.
app.locals.pretty = true;
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public')); // 정적인 파일이 위치한 디렉토리를 지정하는 기능
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/topic:id', (req, res) => {
  const topics = [
    'Javascript is ...',
    'Nodejs is ...',
    'Express is ...',
  ];

  const output = `
  <a href="/topic?id=0">JavaScript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br><br>
  ${topics[req.params.id]}
  `
  res.send(output);
});
app.get('/form', (req, res) => {
  res.render('form');
})
app.get('/form_receiver', (req, res) => {
  const title = req.query.title;
  const description = req.query.description; 
  res.send(title + ',' + description);
})
app.post('/form_receiver', (req, res) => {
  const title = req.body.title;
  const discription = req.body.description;
  res.send(title + '+' + discription);
})

app.get('/topic/:id/:mode', (req, res) => {
  res.send(req.params.id + ',' + req.params.mode)
})
app.get('/template', (req, res) => {
  res.render('temp', {_title: 'pug' ,time: Date()});
})
app.get('/', (req, res) => { // get이라는 함수의 인자로 들어오는 함수는 형태가 약속되어 있음 : req / res
  res.send('Welcome to the Express World!');
});
app.get('/route', (req, res) => {
  res.send('Hello Router, <img src="/code.png">');
});
app.get('/dynamic', (req, res) => { // 라우터가 라우팅한 변경 사항은 서버를 껐다 켜야 반영이 된다. => 동적으로 처리 
  let lis = '';
  for (let i = 0; i < 5; i++) {
    lis = lis + '<li>coding</li>';
  }
  let time = Date();
  const str = `
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
  res.send(str);
})
app.get('/login', (req, res) => {
  res.send('<h1>Login please</h1>');
});

app.listen(3000, () => {
  console.log('Connected 3000 port!');
});

// req : get 이라는 함수가 사용자가 루트로 들어왔을 때 함수를 실행시키면서 첫번째 매개변수의 값으로 사용자가 요청한 것과 관련된 정보를 담고 있는 객체
// res : 사용자가 요청한 정보에 대해서 응답을 할 수 있는 여러 방법을 담고 있는 응답에 대한 객체

/* 
어떤 경로와 실행 내용을 이어주는 메소드를 router라고 부르고, router가 하는 일을 routing이라고 한다.
라우팅 : 사용자의 요청과 요청에 대한 처리인 controller를 중개 해주는 것.
*/