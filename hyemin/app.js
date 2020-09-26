const { query } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

//express 모듈은 사실 함수
const app = express();
const port = 3000;

app.set("view engine", "pug");
// 템플릿 엔진과 express 연결
// view engine은 약속된 키워드
app.set("views", "./views");
// 템플릿들이 들어있는 폴더의 디렉토리

app.use(express.static("public"));
// static이 dynamic 파일 serve?
// 서버 껐다 키지 않아도 새로고침하면 반영됨

app.use(bodyParser.urlencoded({ extended: false }));

//라우터
app.get("/", (req, res) => {
  //컨트롤러
  res.send("Hello World!");
});

app.get("/home", (req, res) => {
  res.send("Welcome to home!");
});

app.get("/login", (req, res) => {
  res.send("Login Please");
});

app.get("/dynamic", (req, res) => {
  res.send(`<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title></title>
      </head>
      <body>
        Hello dynamic!
      </body>
    </html>`);
});
//새로고침해도 변경 반영 안 됨 -> 정적

app.get("/template", function (req, res) {
  res.render("temp", { time: Date(), _title: "Hello Pug" });
});
// html 파일을 렌더하는 경우에는 send 말고 render 메서드!

app.get("/topic", function (req, res) {
  var topics = ["Javascript is...", "Nodejs is ...", "Express is ..."];
  var output = `<a href="/topic?id=0">Javascript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br>
${topics[req.query.id]}
  `;
  res.send(output);
});

app.get("/semantic/:id", function (req, res) {
  var topics = ["Javascript is...", "Nodejs is ...", "Express is ..."];
  var output = `<a href="/topic?id=0">Javascript</a><br>
  <a href="/topic?id=1">Nodejs</a><br>
  <a href="/topic?id=2">Express</a><br>
${topics[req.params.id]}
  `;
  res.send(output);
});

app.get("/semantic/:id/:mode", function (req, res) {
  res.send(req.params.id + "," + req.params.mode);
});

app.get("/form", function (req, res) {
  res.render("form");
});

app.get("/form_receiver", function (req, res) {
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + "," + description);
});

app.post("/form_receiver", function (req, res) {
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + "," + description);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
