const mongoose = require("mongoose");

const topicSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Topic", topicSchema);
