const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const users = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  }
}, {versionKey: false, timestamps: true})

users.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password, bcrypt.genSaltSync(12))
};

users.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model("user", users);

module.exports = {User}