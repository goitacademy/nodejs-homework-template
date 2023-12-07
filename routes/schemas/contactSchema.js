const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().regex(/^\(?\d{3}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/).required(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = {contactSchema, favoriteSchema};