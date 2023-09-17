const Joi = require("joi");

// Схема валідація для покета Joi
const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required()
    .messages({
      "any.required": "missing required email field",
      "string.email": "invalid email",
    }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

module.exports = {
  addSchema,
};
