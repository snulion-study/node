var express = require("express");
var router = express.Router();

var posts = require("../model/post"); // 스키마 불러오기

// Create
router.post("/", function(req, res, next) {
  const { title, content } = req.body; // 비구조화 할당

  console.log(req.body);

  var postModel = new posts();
  postModel.title = title;
  postModel.content = content;
  postModel
    .save()
    .then(newPost => {
      console.log("Create 완료");
      res.status(200).json({
        message: "Create success",
        data: {
          post: newPost
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

module.exports = router;

//Read All
router.get("/", function(req, res, next) {
  posts
    .find()
    .then(posts => {
      console.log("Read All 완료");
      res.status(200).json({
        message: "Read All success",
        data: {
          post: posts
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});

//Read Detail
router.get("/:post_id", function(req, res, next) {
  const postId = req.params.post_id;

  posts
    .findOne({ _id: postId })
    .then(post => {
      if (!post) return res.status(404).json({ message: "post not found" });
      console.log("Read Detail 완료");
      res.status(200).json({
        message: "Read Detail success",
        data: {
          post: post
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});


//Update
router.put("/:post_id", async function(req, res, next) {
  const post_id = req.params.post_id;
  const { title, content } = req.body;

  try {
    var post = await posts.findById(post_id);
    if (!post) return res.status(404).json({ message: "post not found" });
    post.title = title;
    post.content = content;
    var output = await post.save();
    console.log("Update 완료");
    res.status(200).json({
      message: "Update success",
      data: {
        post: output
      }
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
});


//Delete
router.delete("/:post_id", function(req, res, next) {
  const post_id = req.params.post_id;

  posts
    .deleteOne({ _id: post_id })
    .then(output => {
      if (output.n == 0)
        return res.status(404).json({ message: "post not found" });
      console.log("Delete 완료");
      res.status(200).json({
        message: "Delete success"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      });
    });
});