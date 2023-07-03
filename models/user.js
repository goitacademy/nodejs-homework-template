const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bCrypt = require("bcryptjs");

const user = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must have at least 8 characters'],
    validate: {
        validator: function (value) {
          // Password must contain at least one uppercase letter, one lowercase letter, and one digit
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
          return passwordRegex.test(value);
        },
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
      }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    minlength: [3, "Email must have at least 3 characters"],
    maxlength: [170, "Email can have at most 170 characters"],
    validate: {
        validator: function (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: "Email must be a valid email address"
      }
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
});

 user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
}; 

const User = mongoose.model("user", user);

module.exports = User;
