const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Duplicated email'],
    },
    phone: {
      type: String,
      required: true,
      unique: [true, 'Duplicated phone'],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
)
  
  const Contact = mongoose.model('contacts', contactSchema)
  
  module.exports = Contact