const mongoose = require('mongoose')
const { Schema, SchemaTypes, model } = mongoose

const contact = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },
  favorite: {
    type: Boolean,
    default: false
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user'
  }
})

const Contacts = model('contact', contact)

module.exports = Contacts
