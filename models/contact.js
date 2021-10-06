const { Schema, model } = require('mongoose')
const Joi = require('joi')

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

const joiContactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(3).required(),
  phone: Joi.string().min(1).required(),
  favorite: Joi.boolean()
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiContactSchema
}
