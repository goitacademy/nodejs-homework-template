const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const validationContactId = Joi.object({
  contactId: Joi.objectId()
    .required()
    .messages({ 'any.required': 'Id is required' }),
});

module.exports = validationContactId;
