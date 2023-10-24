const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: String,
}, {
  versionKey: false,
  timestamps: true,
});

const User = model('User', userSchema);

module.exports = User;
