const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseSchemaError } = require('../helpers');


// mongoose shema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseSchemaError);

// __________________________

// joi shemas

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});


// __________________________


const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
