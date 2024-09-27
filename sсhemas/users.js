const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const user = new Schema({
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
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
});

user.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, +process.env.BCRYPT_SALT);
};

user.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('users', user);

module.exports = { User };
