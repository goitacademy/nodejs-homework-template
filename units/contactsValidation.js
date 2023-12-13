const Joi = require("joi");

const schema = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).max(12).required().messages({
        "string.base": "Name must be a string",
        "string.min": "Name must be at least {#limit} characters long",
        "string.max": "Name cannot be longer than {#limit} characters",
        "any.required": "Name is required",
      }),
      email: Joi.string().email().required().messages({
        "string.base": "Email must be a string",
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
      phone: Joi.string().required().messages({
        "string.base": "Phone must be a string",
        "any.required": "Phone is required",
      }),
    })
    .validate(data, { abortEarly: false });

module.exports = schema;
