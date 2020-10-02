const { query } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", "./views");


app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
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

app.get("/template", function (req, res) {
  res.render("temp", { time: Date(), _title: "Hello Pug" });
});

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
