const mongoose = require('mongoose')

const schemaContact = new mongoose.Schema({
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
    required: false,
    default: false,
  },
})

const Contact = mongoose.model('Contact', schemaContact)

module.exports = {
  Contact,
}
