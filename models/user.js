const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

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
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL:{
      type:String
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: true
    },
  },
  { varsionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required()
})

const schemas = {
  register: registerSchema,
  login: loginSchema,
  subscription: subscriptionSchema,
  email : emailSchema
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
