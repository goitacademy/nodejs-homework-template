const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  }
}, { versionKey: false, timestamps: true })

const Contact = mongoose.model('contacts', contactSchema)

module.exports = Contact
