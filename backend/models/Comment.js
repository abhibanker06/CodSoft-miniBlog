const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', CommentSchema)||mongoose.model('Comment', CommentSchema);
