const { Schema, model } = require('mongoose')

const contactSchema = new Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: String
})

const Contact = model('contact', contactSchema)

module.exports = Contact
