const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi);

const validationUserId = Joi.object({
  userId: Joi.objectId()
    .required()
    .messages({ 'any.required': 'Id is required' }),
});

module.exports = validationUserId;
