// model/post.js
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    date: { type: Date, default: Date.now },
  },
  { versionKey: "_somethingElse" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
