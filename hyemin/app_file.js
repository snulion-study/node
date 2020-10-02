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

app.get(["/topic", "/topic/:id"], function (req, res) {
  fs.readdir("data", function (err, files) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    const id = req.params.id;
    //id값이 있을 때
    if (id) {
      fs.readFile("data/" + id, "utf8", function (err, data) {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
        res.render("view", { topics: files, title: id, description: data });
      });
    } else {
      res.render("view", {
        topics: files,
        title: "Welcome",
        description: "Hello, Javascript for server",
      });
    }
  });
});

app.post("/topic", function (req, res) {
  const title = req.body.title;
  const description = req.body.description;
  fs.writeFile("data/" + title, description, function (err) {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect("/topic/" + title);
  });
});
//mongodb+srv://hyemmie:<password>@cluster0.ugjn4.mongodb.net/<dbname>?retryWrites=true&w=majority

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
