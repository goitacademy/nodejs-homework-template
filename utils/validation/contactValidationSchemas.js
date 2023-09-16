const Joi = require('joi');
const { validateErrorMessageList, regexpList } = require('../../variables');

/**
 * Joi schema for validating the request body when adding a contact.
 */
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(regexpList.email).required(),
  phone: Joi.string().pattern(regexpList.phone).required(),
  favorite: Joi.boolean().default(false),
}).messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating a contact.
 */
const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(regexpList.email),
  phone: Joi.string().pattern(regexpList.phone),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages(validateErrorMessageList);

/**
 * Joi schema for validating the request body when updating the status of a contact.
 */
const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).messages({
  ...validateErrorMessageList,
  'any.required': 'missing field favorite',
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
};

// This code defines three Joi schemas for validating the request body when adding, updating, or updating the status of a contact. Each schema specifies the expected data types, patterns, and requirements for the fields in the request body.

// 'addContactSchema' is used for validating the request body when adding a contact. It requires the name, email, and phone fields and sets a default value of false for favorite if it's not provided.

// 'updateContactSchema' is used for validating the request body when updating a contact. It allows any combination of name, email, phone, and favorite fields to be updated. It uses .min(1) to ensure that at least one field is provided.

// 'updateStatusContactSchema' is used for validating the request body when updating the status of a contact. It requires the favorite field and provides a custom error message for the case where it's missing.

// These schemas help ensure that incoming request data conforms to the expected format and constraints, making your API more robust and secure.
