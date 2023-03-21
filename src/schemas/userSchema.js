const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");
const gravatar = require('gravatar');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL:{
    type: String,
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

userSchema.methods.generateAvatar = function (email) {
  this.avatarURL = gravatar.url(email, {s: '250'});
};

const User = model("user", userSchema);

module.exports = User;
