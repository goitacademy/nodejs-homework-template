const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactShema = Schema({
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

const Contact = model('contact', contactShema)

const patchShema = Joi.object({
  favorite: Joi.boolean().required()
})

const putSchema = Joi.alternatives().try(
  Joi.object({
    name: Joi.string().allow(''),
    email: Joi.string().allow(''),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
  }),
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().allow(''),
    phone: Joi.string().allow(''),
    favorite: Joi.boolean()
  }),
  Joi.object({
    name: Joi.string().allow(''),
    email: Joi.string().required(),
    phone: Joi.string().allow(''),
    favorite: Joi.boolean()
  }),
  Joi.object({
    name: Joi.string().allow(''),
    email: Joi.string().allow(''),
    phone: Joi.string().allow(''),
    favorite: Joi.boolean().required()
  })
)

const joiShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

module.exports = { Contact, joiShema, patchShema, putSchema }
