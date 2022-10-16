const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .min(5)
    .max(45),
  phone: Joi.string().min(5).max(15).required(),
});

module.exports = schema;
