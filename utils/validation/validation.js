const Joi = require('joi');
const mongoose = require('mongoose');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorit: Joi.boolean().default(false),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateId = (id) => mongoose.isValidObjectId(id);

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
  validateId,
};
