const {Schema, model} = require('mongoose')
const Joi = require('joi')

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
  })

const Contact = model('contact', contactsSchema)

const validateSchema = Joi.object({
    name: Joi.string()
    .alphanum()
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
    phone: Joi.string()
    .required()
  })

const schemas = {
    validateSchema
}

module.exports = {
    Contact,
    schemas
}