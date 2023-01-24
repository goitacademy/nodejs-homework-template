const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ukr'] } })
  .required(),
  phone: Joi.number().integer().positive().min(5).required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ukr'] } }),
  phone: Joi.number().integer().positive().min(5),
});

module.exports = {
    contactAddSchema,
    contactUpdateSchema,
}