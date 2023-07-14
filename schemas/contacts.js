const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(25)
    .pattern(/^[-a-zA-Zа-яА-ЯёЁ\s]+$/u)
    .required(),
  email: Joi.string()
    .regex(
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    )
    .messages({
      "string.pattern.base": `Email must be in a valid format: name@example.com.`,
    })
    .required(),
  phone: Joi.string()
    .regex(/^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/)
    .messages({
      "string.pattern.base": `Phone number must be in a valid format: +38(044)555-55-55 and have 12 digits.`,
    })
    .required(),
});

module.exports = {
    addSchema,
}