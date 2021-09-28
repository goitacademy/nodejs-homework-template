const { Schema, model } = require('mongoose')
const Joi = require('joi')

const phoneRegexp = /^\(\d{3}\)(\s)\d{3}(-)\d{4}$/
const emailRegexp = /\S+@\S+\.\S+$/
// const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for connect'],
    minLength: 4
  },
  email: {
    type: String,
    required: [true, 'Set email for connect'],
    unique: true,
    match: emailRegexp
  },
  phone: {
    type: String,
    required: [true, 'Set phone for connect'],
    unique: true,
    match: phoneRegexp
  },
  favourite: {
    type: Boolean,
    default: false
  }
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  favourite: Joi.boolean()
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  Contact
}
