const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
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
    enum: {
      values: ["starter", "pro", "business"],
      message: "{VALUE} must be one of [`starter`,`pro`, `business`]",
    },

    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
});

module.exports = mongoose.model("User", User);
