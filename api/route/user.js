// Importing modules
const { Router } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const { db } = require("../model/user");
const router = express.Router();
// Importing User Schema
const User = require("../model/user");
const auth = require("./auth");

// User login api
router.post("/login", (req, res) => {
  // Find user with requested email
  User.findOne({ username: req.body.userName }, function (err, user) {
    if (user === null) {
      return res.status(401).json({ severity: "info", message: "Ce compte n'existe pas" });
    } else {
      if (user.validPassword(req.body.password)) {
        const _token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.JWT_SECRET,{ expiresIn: '1d' }
        );
        return res.status(201).json({
          token: _token,
          userData: {
            userName: req.body.userName,
            email: user.email
          },
        });
      } else {
        return res.status(401).json({
          severity: "error",
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
      return res.status(401).json({
        severity: "info",
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
          return res.status(401).json({
            severity: "error",
            message: "L'inscription a échoué",
          });
        } else {
          return res.status(201).json({
            severity: "success",
            message: "Inscription aves succés!",
          });
        }
      });
    }
  });
});

router.post("/checkTokenValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json({isValid: false});
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json({isValid: false});
    const user = await User.findById(verified.id);
    if (!user) return res.json({isValid: false});
    return res.json({isValid: true, userData: {userName: user.username,
      email: user.email}});
  } catch (err) {
    console.log({ severity: "info", message: err.message });
  }
});

router.get("/getUser", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) return res.json(false);
    return res.status(200).json({
      userName: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ severity: "info", message: err.message });
  }
});


// Export module to allow it to be imported in other files
module.exports = router;
