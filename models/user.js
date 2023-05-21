const { Schema, model } = require('mongoose');

const Joi = require('joi');
// const { handleMongooseError } = require('../middlewares');
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
    token: {
      type: String,
      default: '',
    },
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

const schemas = {
  userRegisterSchema,
  userLoginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
