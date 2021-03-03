const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    min: 3
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    required: [true, 'Set name for phone'],
    unique: true,
    min: 2
  },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free'
  },
  password: {
    type: String,
    default: 'password',
    min: 3
  },
  token: {
    type: String,
    default: ''
  }

}, { versionKey: false, timestamps: true })

const Contact = model('contact', contactSchema)

module.exports = Contact
