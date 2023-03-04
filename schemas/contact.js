const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/)
    .min(9)
    .max(11)
    .required(),
});

module.exports = contactSchema;
