const { Schema, model } = require('mongoose')

const ContactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Please, add name']
  },
  email: {
    type: String,
    required: [true, 'Please, add email']
  },
  phone: {
    type: String,
    required: [true, 'Please, add phone number']
  },
  favorite: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
})

const Contact = model('contact', ContactSchema)

module.exports = Contact
