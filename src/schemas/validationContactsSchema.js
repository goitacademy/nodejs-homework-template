const Joi = require('joi');

const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(9).max(15).required(),
  favorite: Joi.boolean().optional(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).optional(),
  phone: Joi.string().min(9).max(15).optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const toggleFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).min(1);

module.exports = {
  toggleFavoriteSchema,
  updateContactSchema,
  addContactSchema,
};
