const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schemaCreateContact = Joi.object({
  name: Joi.string().trim().min(3).max(30).required().messages({
    'any.required': 'Поле name обязательное',
    'string.empty': 'Поле name не может быть пустым',
  }),
  email:Joi.string().trim().email().required().messages({
    'any.required': 'Поле email обязательное',
    'string.empty': 'Поле email не может быть пустым',
  }),
  phone:Joi.string().trim().pattern(/[0-9]+/).required().messages({
    'any.required': 'Поле phone обязательное',
    'string.empty': 'Поле phone не может быть пустым',
  }),
})

const schemaFavoriteContact = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ 'any.required': 'missing field favorite' }),
})

const schemaMongoId = Joi.object({
  contactId: Joi.objectId().required(),
})

module.exports = { schemaCreateContact, schemaFavoriteContact, schemaMongoId}