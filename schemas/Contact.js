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
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: '_user',
  }
}, {
  versionKey: false,
  timestamps: true
})

const Contact = model('_contact', ContactSchema)

module.exports = Contact
