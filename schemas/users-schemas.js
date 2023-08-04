const Joi = require("joi");

const emailRegexp = require("../constants/user-constants");

const userSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "missing required password field",
  }),
  avatarURL: Joi.string(),
});

module.exports = {
  userSchema,
};
