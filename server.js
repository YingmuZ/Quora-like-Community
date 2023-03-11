const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
require('./config/mongoose');
const route = require("./config/route.js");
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
  secret: process.env.DATABASE_CONNECTION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(route);
app.listen(3000, () => {
  console.log("server is on port 3000");
})