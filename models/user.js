const {Schema, model} = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
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
        required: true,
      },
    },
    {versionKey: false, timestamps: true},
);

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const userJoiSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
  token: Joi.string(),
});

const subscriptionJoinSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  userJoiSchema,
  subscriptionJoinSchema,
};
