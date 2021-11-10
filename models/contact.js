const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactShema = Schema({
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
}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactShema)

const patchShema = Joi.object({
  favorite: Joi.boolean().required()
})

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

module.exports = { Contact, joiShema, patchShema }
