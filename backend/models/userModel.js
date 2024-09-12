const Joi = require("joi");
const { Schema, model } = require("mongoose");
const email = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;


const usersSchema = new Schema(
    {
  password: {
    type: String,
    required: [true, 'Set password for user'],
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
  token: String
}
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
    email: Joi.string().pattern(email).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(email).required(),
  password: Joi.string().min(6).required(),
});

const User = model('user', usersSchema);

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  User,
  schemas,
};
