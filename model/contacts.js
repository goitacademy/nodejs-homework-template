const { Schema, model } = require('mongoose')
const Joi = require('joi')

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
    owner: {
      type: Schema.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
)

const joiContactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^([A-Z]?[a-z]+([ ]?[a-z]?['-]?[A-Z]?[a-z]+)*)$/)
    .required(),
  email: Joi.string()
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required(),
  phone: Joi.string()
    .pattern(
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
    )
    .required(),
  favorite: Joi.boolean().required(),
})

const joiFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiContactSchema, joiFavoriteSchema }