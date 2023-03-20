const userModel = require("../models/user");
const Question = require("../models/question");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const homepage = (req, res) => {
  Question.find()
    .sort({ updatedAt: -1 })
    .then((result) => {
      res.render("mainPage", { result, message: "" });
    })
    .catch((err) =>
      res.render("mainPage", { message: "no questions found", result: [""] })
    );
};

const showAuthPage = (req, res) => {
  res.render("authenticationPage", {
    error: "",
    loginError: "",
  });
};

const signUp = (req, res) => {
  if (req.body.Password != req.body.RepeatedPassword) {
    res.render("authenticationPage", {
      error: "Passwords don't match!",
      loginError: "",
    });
  } else {
    let hashedPassword = bcrypt.hashSync(req.body.Password, 12);
    let userData = {
      ...req.body,
      Password: hashedPassword,
    };
    let newUser = new userModel(userData);
    newUser
      .save()
      .then((user) => {
        const userToken = jwt.sign({ id: user._id }, "secret", {
          expiresIn: "1d",
        });
        res.cookie("isLoggedIn", userToken);
        res.redirect("/");
      })
      .catch((err) => {
        let errorMessage = handleErrors(err);
        res.render("authenticationPage", {
          error: errorMessage,
          loginError: "",
        });
      });
  }
};

const handleErrors = (err) => {
  let error = "";
  if (err.code === 11000) {
    error = "that email is already registered!";
    return error;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error = properties.message;
    });
    return error;
  }
};

const logIn = async (req, res) => {
  let user = await userModel.findOne({ Email: req.body.Email });
  if (!user) {
    res.render("authenticationPage", {
      loginError: "Please, sign up first",
      error: "",
    });
  } else {
    let checkPassword = bcrypt.compareSync(req.body.Password, user.Password);
    if (!checkPassword) {
      res.render("authenticationPage", {
        loginError: "Wrong Password!",
        error: "",
      });
    } else {
      const userToken = await jwt.sign({ id: user._id }, "secret", {
        expiresIn: "1d",
      });
      res.cookie("isLoggedIn", userToken);
      res.redirect("/");
    }
  }
};

const loggingOut = (req, res) => {
  res.clearCookie("isLoggedIn");
  res.redirect("/");
};

module.exports = {
  homepage,
  showAuthPage,
  signUp,
  logIn,
  loggingOut,
};
