const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String,
    required: [true, 'Set email for contact']
  },
  phone: {
    type: String,
    required: [true, 'Set phone for contact'],
    min: 1,
    max: 17
  },
  subscription: {
    type: String,
    default: 'free',
  },
  password: {
    type: String,
    required: [true, 'Set password for contact'],
    min: 1,
    max: 17
  },
  token: {
    type: String,
  },
},
{
  versionKey: false,
  timestamps: true,
})

const Contact = model('contact', contactSchema)

module.exports = Contact
