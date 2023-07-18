const Joi = require("joi");

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .message("Wrong email format")
      .required(),
    phone: Joi.string()
      .regex(/\(\d{3}\) \d{3}-\d{4}/)
      .message("Wrong format. Example: (000) 111-1234")
      .required(),
  });

  module.exports = contactsSchema;