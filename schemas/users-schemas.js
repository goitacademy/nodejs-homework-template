const Joi = require("joi");

const emailRegexp = require("../constants/user-constants")

const userSignUpSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "missing required name field",
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required password field",
  }),
  favorite: Joi.boolean(),
});

module.exports = {
	userSignUpSchema,
};