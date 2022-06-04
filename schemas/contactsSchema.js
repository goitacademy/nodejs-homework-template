const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z. ']+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[ -./0-9]*$/)
    .length(14)
    .required(),
});

module.exports = contactsSchema;
