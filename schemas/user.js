const Joi = require("joi");

const emailRegexp = /^\w+(\.-?\w+)*@\w+(\.-?\w+)*(\.\w{2,3})+$/;

const registerJoiSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
}).messages({
  "any.required": "Missing required {{#label}} field!",
  "string.empty": "The {{#label}} field can't be empty!",
});

const loginJoiSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({
  "any.required": "Missing required {{#label}} field!",
  "string.empty": "The {{#label}} field can't be empty!",
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
}).messages({
  "any.required": "Missing required {{#label}} field!",
  "string.empty": "The {{#label}} field can't be empty!",
});

const emailSchema = Joi.object({
  email: Joi.string().email().pattern(emailRegexp).required(),
});

module.exports = {
  registerJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
  emailSchema,
};
