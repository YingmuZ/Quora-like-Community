const mongoose = require('mongoose');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
  UserName :{
    type: String,
    require: true,
  },
  Email:{
    type: String,
    require: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  Password:{
    type: String,

    require: [true, 'Please enter a password']

  },
  Questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  Comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

const User= mongoose.model('User', userSchema);

module.exports = User;