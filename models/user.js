const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,18}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegEx,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: passwordRegEx,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
};

const User = model('user', userSchema);

module.exports = User