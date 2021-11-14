const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minlength: 3
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([/.-]?\w+)*@\w+([/.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  versioKey: false,
  timestamps: true
})

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).required(),
  favorite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema
}
