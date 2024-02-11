const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phone: Joi.string().pattern(/[0-9]{9}/),
  favorite: Joi.bool(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "pl", "gov", "net"] },
  }),
});

module.exports = { contactSchema };
