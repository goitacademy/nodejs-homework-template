const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const schemaContacts = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique: true,
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
  }
)

const Contacts = mongoose.model('contact', schemaContacts)

module.exports = {
  schemaContacts,
  Contacts
}
