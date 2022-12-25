// Importing modules
const { Router } = require("express");
const express = require("express");
const { db } = require("../model/user");
const router = express.Router();
// Importing User Schema
const User = require("../model/user");

// User login api
router.post("/login", (req, res) => {
  // Find user with requested email
  User.findOne({ username: req.body.userName }, function (err, user) {
    if (user === null) {
      return res.json({ severity : "info",
        message: "Ce compte n'existe pas",
      });
    } else {
      if (user.validPassword(req.body.password)) {
        return res.status(201).json({
          userData: {userName : req.body.userName,
          email : user.email}
        });
      } else {
        return res.json({ severity : "error",
        message: "Nom d'utilisateur, ou mot de passe incorrect",
      });
      }
    }
  });
});

// User signup api
router.post("/signup", (req, res, next) => {
  // Creating empty user object
  User.findOne({ username: req.body.userName }, function (err, user) {
    if (user !== null) {
      return res.json({ severity : "info",
        message: "Cet utilisateur existe déjà",
      });
    } else {
      let newUser = new User();
      // Initialize newUser object with request data
      (newUser.username = req.body.userName),
        (newUser.email = req.body.email),
        (newUser.password = req.body.password);

      // Call setPassword function to hash password
      newUser.setPassword(req.body.password);

      // Save newUser object to database
      newUser.save((err, User) => {
        if (err) {
          return res.json({severity : "error",
            message: "L'inscription a échoué",
          });
        } else {
          return res.json({severity : "success",
            message: "Inscription aves succés!",
          });
        }
      });
    }
  });
});


// Export module to allow it to be imported in other files
module.exports = router;
