const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }).required(),
  phone: Joi.string().pattern(/^[0-9()+\s-]{5,14}$/).required(),
});

module.exports = { contactSchema };