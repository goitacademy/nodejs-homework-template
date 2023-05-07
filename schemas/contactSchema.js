const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, { name: "numbers" })
      .required(),
    
  });

module.exports = contactSchema;