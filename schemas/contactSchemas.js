const joi = require('joi');
const { emailRegexp, phoneRegexp } = require('../constants/schemaCommons');

const addContactSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().pattern(emailRegexp).required(),
  phone: joi.string().pattern(phoneRegexp).required(),
  favorite: joi.boolean().default('false'),
});

const updateFavoriteSchema = joi.object({
  favorite: joi
    .boolean()
    .required()
    .messages({ 'any.required': 'Missing field "favorite"' }),
});

const updateContactSchema = joi
  .object({
    name: joi.string(),
    email: joi.string().pattern(emailRegexp),
    phone: joi.string().pattern(phoneRegexp),
    favorite: joi.boolean(),
  })
  .or('name', 'email', 'phone', 'favorite');

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
};
