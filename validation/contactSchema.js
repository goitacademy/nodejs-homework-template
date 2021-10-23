const Joi = require("joi");

const joiContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .max(30)
    .required(),
  phone: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports = joiContactSchema;
