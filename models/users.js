// models/users.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
