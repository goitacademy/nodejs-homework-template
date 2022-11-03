const {Schema, model} = require('mongoose')
const Joi = require('joi')
const onSaveErrors = require('../helpers/onSaveErrors')

const contactsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  }, {versionKey: false, timestamps: true})

  contactsSchema.post("save", onSaveErrors);

const Contact = model('contacts', contactsSchema)

const validateAddSchema = Joi.object({
    name: Joi.string()
    .alphanum()
    .required().messages({
      'string.base': `"name" should be a type of 'string'`,
      'any.required': `"name" is a required field`
    }),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required().messages({
      'string.base': `"email" should be a type of 'string'`,
      'any.required': `"email" is a required field`
    }),
    phone: Joi.string()
    .required().messages({
      'string.base': `"phone" should be a type of 'string'`,
      'any.required': `"phone" is a required field`
    }),
    favorite: Joi.boolean()
  })
const validateFavoritePatchSchema = Joi.object({
  favorite: Joi.boolean()
  .required().messages({
    'string.base': `"favorite" should be a type of 'string'`,
    'any.required': `missing field "favorite"`
  })
})
const schemas = {
  validateAddSchema,
  validateFavoritePatchSchema
}

module.exports = {
    Contact,
    schemas
}