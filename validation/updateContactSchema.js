const Joi = require("joi");

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
}).or("name", "email", "phone", "favorite");

module.exports = updateSchema;
