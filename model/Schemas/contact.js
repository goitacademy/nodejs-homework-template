const { Schema, model } = require('mongoose')
const Joi = require('joi')

const codeRegexp = /^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: codeRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true })

const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/).required(),
  favorite: Joi.boolean(),
})

const joiSchemaUpdate = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean(),
}).or('name', 'email', 'phone')

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  joiSchemaUpdate
}
