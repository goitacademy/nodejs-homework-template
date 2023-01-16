const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .regex(/^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/)
    .message('Phone format (xxx) xxx-xxxx')
    .required(),
});

module.exports = contactsSchema;
