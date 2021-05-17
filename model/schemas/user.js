const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const SALT = 7;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlenght: 6,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const val = /\S+@\S+\.\S+/;
        return val.test(String(value).toLowerCase());
      },
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
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  //   if (!this.isModified('password')) {
  //     return next();
  //   }
  const salt = await bcrypt.genSalt(SALT);
  this.password = await bcrypt.hash(this.password, salt, null);
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('user', userSchema);
module.exports = User;
