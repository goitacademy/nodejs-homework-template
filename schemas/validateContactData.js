const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[-a-zA-Zа-яА-ЯёЁ\s]+$/u)
    .required(),
  email: Joi.string().regex(/@/).required(),
  phone: Joi.string()
    .pattern(/^[\d+\-()]+$/)
    .required(),
});

module.exports = addSchema;
