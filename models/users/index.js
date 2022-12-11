const { Schema, model } = require("mongoose");
const mailRegEx = require("../../helpers/mailRegEx");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    match: mailRegEx,
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
    default: "",
  },
});

const User = model("user", userSchema);

module.exports = User;
