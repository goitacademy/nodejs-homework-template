const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().min(6).max(32).required().messages({
    "any.required": "Password is required and must contain 6 to 32 symbols...",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ "any.required": "email is required!" }),
});

module.exports = {
  registerSchema,
};
