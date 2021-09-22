const mongoose = require('mongoose')
const Joi = require('joi')

const { Schema, model } = mongoose

const contactSchema = Schema({
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

const joiContactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  phone: Joi.number().min(6).required(),
  favorite: Joi.boolean(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiContactSchema }
