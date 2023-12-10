const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "missing required password field",
  }),
});

module.exports = userSchema;
