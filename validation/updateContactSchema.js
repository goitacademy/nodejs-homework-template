const Joi = require("joi");

const joiUpdateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .max(30)
    .optional(),
  phone: Joi.string().alphanum().min(3).max(30).optional(),
});

module.exports = joiUpdateContactSchema;
