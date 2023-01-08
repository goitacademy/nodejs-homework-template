const Joi = require("joi");

const putContactSchema = Joi.object({
  name: Joi.string().min(3).max(33).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string()
    .pattern(/^[0-9() -]+$/, "numbers")
    .optional(),
});

module.exports = { putContactSchema };
