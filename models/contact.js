const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Joi = require('joi');

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
}, { versionKey: false, timestamps: true });

const schemaJoi = Joi.object({
  name: Joi.string()
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .min(7)
    .max(14)
    .required(),
  favorite: Joi.bool()
})

const schemaJoiFavorite = Joi.object({
  favorite: Joi.bool()
  .required()
})
const Contact = mongoose.model('contact', contactSchema)

module.exports = {
  Contact,
  schemaJoi,
  schemaJoiFavorite
}
