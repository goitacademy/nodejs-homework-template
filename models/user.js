const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    default: "Guest",
  },
  email: {
    type: String,
    required: [true, "Set email for user"],
    unique: true,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const User = model("user", userSchema);
module.exports = User;
