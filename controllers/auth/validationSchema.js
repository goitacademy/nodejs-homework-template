const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
  token: Joi.string().allow(null).default(null),
  owner: Joi.string().allow(null).default(null),
});

module.exports = userSchema;
