const Joi = require('joi');
const { regexName, regexPhone } = require('../../helpers/regex');

const validationUpdateContact = Joi.object({
  name: Joi.string().pattern(regexName).min(1).max(50).optional().messages({
    'any.optional': "Name field isn't required",
    'string.empty': 'The name field cannot be empty',
  }),
  email: Joi.string().email().optional().messages({
    'any.optional': "Email field isn't required",
    'string.empty': 'The email field cannot be empty',
  }),
  phone: Joi.string().pattern(regexPhone).min(7).max(30).optional().messages({
    'any.optional': "Phone field isn't required",
    'string.empty': 'The phone field cannot be empty',
  }),
  favorite: Joi.boolean,
});

module.exports = validationUpdateContact;
