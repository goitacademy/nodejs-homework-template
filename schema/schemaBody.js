const Joi = require('joi');

/**
 *  validate for missing body object
 */
const schemaBodyObject = Joi.object().required().min(1).messages({
  'object.min': 'Missing fields',
});

/**
 * validate body fields
 */
const schemaBody = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required <name> field',
    'string.empty': 'Field <name> cannot be an empty string',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Missing required <email> field',
    'string.empty': 'Field <email> cannot be an empty string',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'Missing required <phone> field',
    'string.empty': 'Field <phone> cannot be an empty string',
  }),
  favorite: Joi.boolean(),
});

const schemaStatusContact = Joi.object({
  favorite: Joi.boolean().required().error(new Error('Missing field favorite')),
});

module.exports = {
  schemaBody,
  schemaBodyObject,
  schemaStatusContact,
};
