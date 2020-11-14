var Topic = require("../models/Topic");

var topicController = {};

topicController.list = function (req, res) {
  Topic.find({}).exec(function (err, topics) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("../views/topic/index", { topics: topics });
    }
  });
};

/**
 * @swagger
 *  topic/show/{id}:
 *    get:
 *      tags:
 *      - topic
 *      description: 게시글 상세정보 조회
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: 게시글 조회
 *       404:
 *        description: 유효하지 않은 id
 *
 */

topicController.show = function (req, res) {
  Topic.findOne({ _id: req.params.id }).exec(function (err, topic) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("../views/topic/show", { topic: topic });
    }
  });
};

topicController.new = function (req, res) {
  res.render("../views/topic/new");
};

topicController.save = function (req, res) {
  var topic = new Topic(req.body);

  topic.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/topic/new");
    } else {
      console.log("Successfully create data");
      res.redirect(`/topic/show/${topic._id}`);
    }
  });
};

topicController.edit = function (req, res) {
  Topic.findOne({ _id: req.params.id }).exec(function (err, topic) {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      res.render("../views/topic/edit", { topic: topic });
    }
  });
};

/**
 * @swagger
 *  topic/edit/{id}:
 *    post:
 *      tags:
 *      - topic
 *      description: 게시글 내용 업데이트
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: title
 *        in: body
 *        description: "게시글 제목"
 *        required: true
 *        type: string
 *      - name: description
 *        in: body
 *        description: "게시글 내용"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: 게시글 성공적으로 업데이트
 *       404:
 *        description: 유효하지 않은 id
 *
 */

topicController.update = function (req, res) {
  Topic.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
    },
    { new: true },
    function (err, topic) {
      if (err) {
        console.log(err);
        res.render("../views/topic/edit", { topic: req.body });
      } else {
        res.redirect(`/topic/show/${topic._id}`);
      }
    }
  );
};

topicController.delete = function (req, res) {
  Topic.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Topic deleted!!");
      res.redirect("/topic");
    }
  });
};

module.exports = topicController;
