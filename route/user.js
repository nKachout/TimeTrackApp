// Importing modules
const { Router } = require("express");
const express = require("express");
const { db } = require("../model/user");
const router = express.Router();
// Importing User Schema
const User = require("../model/user");

// User login api
router.post("/login", (req, res) => {
  console.log("user login");
  // Find user with requested email
  User.findOne({ username: req.body.username }, function (err, user) {
    if (user === null) {
      return res.status(400).render("loginPage.ejs", {
        message: "Ce compte n'existe pas",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).render("index.ejs", {
          ma_variable: req.body.username,
        });
      } else {
        return res.status(400).render("loginPage.ejs", {
          message: "Nom d'utilisateur, ou mot de passe incorrect",
        });
      }
    }
  });
});

// User signup api
router.post("/signup", (req, res, next) => {
  // Creating empty user object

  User.findOne({ username: req.body.username }, function (err, user) {
    if (user !== null) {
      return res.status(400).render("signUpPage.ejs", {
        message: "Cet utilisateur existe déjà",
      });
    } else {
      let newUser = new User();
      // Initialize newUser object with request data
      (newUser.username = req.body.username),
        (newUser.email = req.body.email),
        (newUser.password = req.body.password);

      // Call setPassword function to hash password
      newUser.setPassword(req.body.password);

      // Save newUser object to database
      newUser.save((err, User) => {
        if (err) {
          return res.status(400).send({
            message: "Failed to add user.",
          });
        } else {
          return res.status(201).render("signUpPage.ejs", {
            message: "Inscription aves succés!",
          });
        }
      });
    }
  });
});


// Export module to allow it to be imported in other files
module.exports = router;
