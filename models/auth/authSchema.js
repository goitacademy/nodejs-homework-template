const { Schema } = require('mongoose');
const bCrypt = require('bcryptjs');

const authSchema = Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required'],
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
  avatarURL: {
    type: String,
    default: null,
  },
});

authSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

authSchema.methods.comparePassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

module.exports = authSchema;
