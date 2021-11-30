const Joi = require('joi');

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/)
    .optional(),
}).or('name', 'email', 'phone');

module.exports = schemaUpdateContact;
