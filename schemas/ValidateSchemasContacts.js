const Joi = require("joi");

const validateAddContactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/^[0-9+()-]*$/)
    .required(),
});
const validateUpdateContactSchema = Joi.object({
  name: Joi.string().min(1).max(30),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(/^[0-9+()-]*$/),
});

module.exports = {
  validateAddContactSchema,
  validateUpdateContactSchema,
};
