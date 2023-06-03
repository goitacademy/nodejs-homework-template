const Joi = require("joi");

const newUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": `Invalid email format`,
    "any.required": `Missing required email field`,
  }),
  password: Joi.string().required().messages({
    "any.required": `Missing required password field`,
  }),
});

module.exports = newUserSchema;
