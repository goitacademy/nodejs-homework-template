const { Schema } = require('mongoose');
const bcryptjs = require('bcryptjs');
const gravatar = require('gravatar');

const userSchema = Schema(
  {
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
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { protocol: 'https' });
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifyCode: {
      type: String,
      required: [true, 'Verification code is required'],
    },
  },
  { timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
};

userSchema.methods.validatePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

module.exports = userSchema;