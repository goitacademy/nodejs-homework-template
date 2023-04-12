const Joi = require("joi");
// для валідації при додавані до json
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required field 'email'",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\d{2}-\d{2}-\d{3}$/)
    .trim()
    .required()
    .messages({
      "string.base": "'phone' should be a type of string",
      "string.empty": "'phone' must contain value",
      "any.required": "missing required field 'phone'",
    }),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .messages({
      "string.base": "'email' should be a type of string",
      "string.email": "field 'email' must be a valid email",
      "any.required": "missing required field 'email'",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\d{2}-\d{2}-\d{3}$/)
    .trim()
    .messages({
      "string.base": "'phone' should be a type of string",
      "string.empty": "'phone' must contain value",
      "any.required": "missing required field 'phone'",
    }),
}).or("name", "email", "phone");

module.exports = {
    addSchema,
    putSchema,
}