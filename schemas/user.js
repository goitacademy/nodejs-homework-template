const Joi = require("joi");
const mailRegEx = require("../helpers/mailRegEx");

const registerUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(mailRegEx).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});
const updateUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(mailRegEx).required(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
const loginUserSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(mailRegEx).required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
};
