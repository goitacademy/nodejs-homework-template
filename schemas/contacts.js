const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required().messages({
    message: "missing required name field",
  }),
  email: Joi.string().email().required().messages({
    message: "missing required email field",
  }),
  phone: Joi.string().min(7).required().messages({
    message: "missing required phone field",
  }),
});

module.exports = { contactSchema };
