const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(40)
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .trim()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .trim()
    .min(9)
    .max(20)
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

module.exports = { contactSchema };
