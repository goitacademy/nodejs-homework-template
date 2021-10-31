const Joi = require("joi");

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
}).or("name", "email", "phone");

module.exports = updateSchema;
