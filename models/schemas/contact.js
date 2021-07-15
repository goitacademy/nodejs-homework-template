const mongoose = require('mongoose')
const { Schema } = mongoose

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
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
  }
})

module.exports = contactSchema
