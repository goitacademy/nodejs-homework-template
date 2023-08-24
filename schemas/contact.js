const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .min(3)
    .max(20)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/)
    .required(),
});

module.exports = contactSchema;