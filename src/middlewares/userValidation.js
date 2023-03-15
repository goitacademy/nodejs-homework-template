const Joi = require("joi");

const userValidation = Joi.object({
  email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({ "string.email": "Invalid e-mail" }),

  password: Joi.string().alphanum().trim().min(7).strip().required(),
});

module.exports = userValidation;
