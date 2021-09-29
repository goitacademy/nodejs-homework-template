const { Schema, model } = require('mongoose')
const Joi = require('joi')

const codeRegexMail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/
const codeRegexPhone = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/

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
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().pattern(codeRegexMail).required(),
  phone: Joi.string().pattern(codeRegexPhone).required(),
  favorite: Joi.boolean(),
})

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  updateFavoriteJoiSchema
}
