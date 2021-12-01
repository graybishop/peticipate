const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  title: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  biggie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Biiggie',
  },
  thread: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Comment',
    }
  ],
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;