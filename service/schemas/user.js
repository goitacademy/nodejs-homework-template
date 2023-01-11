const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const user = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
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
  token: String,
});

// user.methods.setPassword = function (password) {
//   this.password = bcrypt.hash(password, bcrypt.genSalt(6));
// };

// user.methods.validPassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

const User = model("user", user);

module.exports = User;
