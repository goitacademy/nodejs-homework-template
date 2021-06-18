const mongoose = require('mongoose');
const gravatar = require('gravatar');
const { Schema, model } = mongoose;
const { SUBSCRIPTION } = require('../../helpers/constants');
const bcrypt = require('bcryptjs');

const SALT_COUNT = 6;

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    default: 'Guest',
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
  },
  email: {
    type: String,
    required: [true, 'Email is required field'],
    unique: true,
    validate(value) {
      const re = /\S+@\S+\.\S+/;
      return re.test(String(value).toLowerCase());
    },
  },
  subscription: {
    type: String,
    enum: [SUBSCRIPTION.STARTER, SUBSCRIPTION.PRO, SUBSCRIPTION.BUSINESS],
    default: SUBSCRIPTION.STARTER,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true);
    },
  },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(SALT_COUNT);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(String(password), this.password);
};

const User = model('user', userSchema);

module.exports = User;
