const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  Title : {
    type: String,
    require: true,
    minLength: [2, "Title must be longer"],
    maxLength: [50, "Title must be shorter"]
  },
  Description: {
    type: String,
    require: true,
    minLength: [5, "Please add more characters to your question"],
    maxLength: [1200, "Comment to long, max 1200 characters"]
  },
  User:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    require: true
  },
  Comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
},
{
  timestamps:true
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;