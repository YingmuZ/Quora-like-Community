const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  Description: {
    type: String,
    require: true,
    minLength: [5, "Please add more characters to your description"],
    maxLength: [1200, "Comment to long, max 1200 characters"]
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  Question: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Question",
    require : true
  }
}, {
  timestamps:true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;