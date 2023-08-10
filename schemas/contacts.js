const Joi = require("joi");

const validationSchema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
      .required(),
  
    phone: Joi.string()
    .regex(/^\\d{3}-\\d{3}-\\d{4}$/)
    .required(),
  
    email: Joi.string()
      .email()
      .required(),
  });

  module.exports = {
    validationSchema,
}