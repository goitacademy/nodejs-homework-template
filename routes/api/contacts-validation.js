const Joi = require('joi');

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'name field is required',
    'string.empty': 'name field cannot be empty',
  }),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.string().valid('false', 'true').required(),
});

module.exports = { schemaCreateContact, favoriteJoiSchema };
