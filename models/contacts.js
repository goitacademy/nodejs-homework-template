const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    min: [3, 'Too short name'],
    max: [30, 'Too long name'],
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'Email is required'],
  },
  phone: {
    type: String,
    unique: true,
    match: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
    required: [true, 'Phone number is required'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  phone: Joi.string()
    .pattern(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
    .required(),

  favorite: Joi.boolean(),
})

const JoiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  JoiUpdateFavoriteSchema
}
