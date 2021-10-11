const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
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
  },
  { versionKey: false, timestamps: true }
)

const validationMessage = { 'any.required': 'missing required name field' }

const joiContactSchema = Joi.object({
  name: Joi.string().min(1).max(30).required().messages(validationMessage),
  email: Joi.string().email().required().messages(validationMessage),
  phone: Joi.string().min(7).required().messages(validationMessage),
  favorite: Joi.boolean(),
})

const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactSchema,
  updateContactStatusSchema,
}
