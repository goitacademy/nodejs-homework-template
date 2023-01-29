const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ukr'] } })
  .required(),
  phone: Joi.string().min(5).max(15).required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua', 'ukr'] } }),
  phone: Joi.string().min(5).max(15),
});

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
    contactAddSchema,
    contactUpdateSchema,
    contactUpdateStatusSchema,
}