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

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const joiSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(7).required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean().optional()
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  updateFavoriteJoiSchema,
  Contact
}
