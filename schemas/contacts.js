const Joi = require('joi');

const addContactSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ukr'] } }),
  phone: Joi.string()
    .pattern(/^[\]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/im)
    .required(),
  favorite: Joi.boolean().optional().default(false),
});

module.exports = {
  addContactSchema,
}