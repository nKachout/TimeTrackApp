// Importing modules
const mongoose = require("mongoose");
var crypto = require("crypto");

// Creating user schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: String,
  salt: String,
});

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.passwordHash === hash;
};

// Exporting module to allow it to be imported in other files
const User = (module.exports = mongoose.model("User", UserSchema));
