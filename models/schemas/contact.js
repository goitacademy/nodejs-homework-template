const { Schema } = require('mongoose')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name must be exist'],
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, 'Email must be exist'],
    unique: true,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

module.exports = contactSchema
