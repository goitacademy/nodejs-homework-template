const { Schema, model } = require('mongoose');

const Joi = require('joi');

// const {handleMongooseError} = require('../middlewares')

const emailRegexp =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegexp,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    subscription: {
      type: String,
      enum: {
        values: ["starter", "pro", "business"],
        message: `Subscriptions options: "starter", "pro", "business"`,
      },
      default: "starter",
    },
    token: {
      type: String,
      default: '',
    },
    avatarURL: {
      type: String,
      required: true,
    }
    
  },
  { versionKey: false, timestamps: true }
);

// !почему-то выкидывает ошибку в authenticate
// userSchema.post("save", handleMongooseError);

// JOI SCHEMA register
const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),  
  password: Joi.string().min(6).required(),  
});

// JOI SCHEMA login
const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

//JOI SCHEMA subscription
const userUpdateSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const schemas = {
  userRegisterSchema,
  userLoginSchema,
  userUpdateSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
