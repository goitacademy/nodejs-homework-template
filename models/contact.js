const { Schema, model } = require('mongoose')
const Joi = require('joi')

const phoneRegexp = /^([0-9]{0,15})?(\([0-9]{3})?(\) [0-9]{3})?([-]{1})?([0-9]{3})?(\+[0-9]{0,14})?$/
const mailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const contactSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: mailRegexp,
    required: [true, 'Set email for contact']
  },
  phone: {
    type: String,
    trim: true,
    match: phoneRegexp,
    required: [true, 'Set phone for contact']

  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().lowercase().trim().pattern(mailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favorite: Joi.boolean(),
})

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiSchema, favoriteJoiSchema }