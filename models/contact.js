const { Schema, model } = require('mongoose')
const Joi = require('joi')

const { handleSaveErrors } = require('../helpers')

const isbnRegexp = /^\d{3}-\d-\d{3}-\d{5}-\d$/

const contactSchema = new Schema(
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
  { versionKey: false, timestamps: true },
)

contactSchema.post('save', handleSaveErrors)

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const schemas = {
  addSchema,
}

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  schemas,
}
