const Joi = require('joi');
// const phonePattern =
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
//  or /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

const contactSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z]+\s?[a-zA-Z]+$/).min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2}),
  phone: Joi.string().pattern(/^[0-9]+$/).min(9).max(11).required()
  // pattern(phonePattern)
  ,
});

module.exports = contactSchema;