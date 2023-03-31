const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z ]+$/)
    .min(2)
    .max(30)
    .required()
    .messages({
      "any.required": `"name" is required`,
      "string.empty": `"name" cannot be empty`,
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `"email" is required`,
      "string.empty": `"email" cannot be empty`,
    }),
  phone: Joi.string()
    .regex(/^\d{10}$/)
    .length(10)
    .required()
    .messages({
      "any.required": `"phone" is required`,
      "string.empty": `"phone" cannot be empty`,
    }),
});
module.exports = addSchema;
