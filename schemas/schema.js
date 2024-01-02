const Joi = require('joi');

const validationSchema = Joi.object({
  name: Joi.string().trim().alphanum().min(2).max(16).required(),
  email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .trim()
    .min(14)
    .max(14)
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

module.exports = {
  validationSchema,
};
