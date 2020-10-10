const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 40,
    required: true,
  },
  detail: {
    type: String,
  },
  date : { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = {Task}