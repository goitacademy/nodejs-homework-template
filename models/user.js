const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers')

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const authSchema = new Schema(  {
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    // match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: String
} )

authSchema.post("save", handleMongooseError);
  
const registerSchema = Joi.object({
  email: Joi.string()
    // .pattern(emailRegexp)
    .trim(),
  password: Joi.string().trim().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim(),
  password: Joi.string().trim().min(6).required(),
}); 

const schemas = {
  registerSchema,
  loginSchema,
}

const User = model('user', authSchema)

module.exports = {
  User,
  schemas,
}