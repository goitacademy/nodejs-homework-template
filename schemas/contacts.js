const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().label("name field").min(3).max(25).required(),
  email: Joi.string()
    .label("email field")
    .email({ minDomainSegments: 2 })
    .required(),
  phone: Joi.string()
    .label("phone field")
    .min(3)
    .trim()
    .max(15)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.pattern.base": `Phone number can contain from 3 to 15 digits.`,
    })
    .required(),
});

module.exports = {
  addSchema,
};
