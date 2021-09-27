const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
  },
  phone: {
    type: String,
    required: [true, 'Set phone number for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.number(),
  favorite: Joi.boolean()
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const Contact = model('contacts', contactSchema)

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact
}
