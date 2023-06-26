const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: emailRegexp,
            unique: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Set password for user'],
        }
    },
    { versionKey: false, timestamps: true }
  );

  userSchema.post('save', handleMongooseError);

  const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });

  const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });

  const schemas = {
    registerSchema,
    loginSchema,
  };

  const User = model("user", userSchema);

  module.exports = { User, schemas };