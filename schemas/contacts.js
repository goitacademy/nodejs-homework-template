const Joi = require('joi');

const addContactsSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'you should provide name!!',
  }),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const editContactsSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const favoriteContactschema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactsSchema,
  editContactsSchema,
  favoriteContactschema,
};
