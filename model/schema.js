const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contact = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { versionKey: false }
)

const Contacts = model('contact', contact)

module.exports = Contacts
