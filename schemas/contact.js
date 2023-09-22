const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.number(),
  });

  module.exports = contactSchema;