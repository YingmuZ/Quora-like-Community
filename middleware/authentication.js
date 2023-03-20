const { JsonWebTokenError } = require('jsonwebtoken');
const questionModel = require('../models/question');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

const checkToken = (req,res, next) => {
    if(req.header('cookie')){
      next();
    }
    else{
    res.redirect('/auth');
    }
}



const checkUser = (req,res, next) => {
  const token = req.cookies.isLoggedIn;
  if(token){
    jwt.verify(token, 'secret', async (err, decodedToken) => {
     if(err){
      console.log(err.message);
      res.locals.user = null;
      next();
     } else {
      let user = await userModel.findById(decodedToken.id);
      res.locals.user = user;
      next();
     }
    })
  } else {
    res.locals.user = null;
    next();
  }
}


module.exports = {
  checkToken, 
  checkUser
}