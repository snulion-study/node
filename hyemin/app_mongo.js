const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const config = require("./config/key");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const { User } = require("./models/User");
const { Post } = require("./models/Post");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", "./views_file");
app.set("view engine", "pug");
app.listen(3000, function () {
  console.log("Connected, 3000 port!");
});

app.get("/topic/new", function (req, res) {
  fs.readdir("data", function (err, files) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render("new", { topics: files });
  });
});

app.get("/topic", function (req, res) {
  Post.find()
    .then((posts) => {
      console.log("Read All 완료");
      res.status(200).json({
        message: "Read All success",
        data: {
          post: posts,
        },
      });
      res.render("view", {
        topics: data.posts.title,
        title: "Welcome",
        description: "Hello, Javascript for server",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

app.get("/topic/:id", function (req, res) {
  const id = req.params.id;
  Post.findOne({ _id: id })
    .then((post) => {
      if (!post) return res.status(404).json({ message: "post not found" });
      console.log("Read Detail 완료");
      res.status(200).json({
        message: "Read Detail success",
        data: {
          post: post,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

app.post("/topic", function (req, res) {
  const { title, description } = req.body; // 비구조화 할당

  const post = new Post();
  post.title = title;
  post.description = description;
  post
    .save()
    .then((newPost) => {
      console.log("Create 완료");
      res.status(200).json({
        message: "Create success",
        data: {
          post: newPost,
        },
      });
      res.redirect("/topic/" + title);
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
