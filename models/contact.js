const { Schema, model } = require('mongoose')
const Joi = require('joi')

const phoneRegexp = /^\(\d{3}\)(\s)\d{3}(-)\d{4}$/
const emailRegexp = /\S+@\S+\.\S+$/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for connect'],
    minLength: 4,
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Set email for connect'],
    match: emailRegexp,
    unique: true
  },
  phone: {
    type: String,
    required: [true, 'Set phone for connect'],
    match: phoneRegexp,
    unique: true
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

const updateFavouriteJoiSchema = Joi.object({
  favourite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  Contact,
  updateFavouriteJoiSchema
}
