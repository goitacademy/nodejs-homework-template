const Joi = require("joi");

const patchContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(10).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional(),
});

module.exports = patchContactSchema;
