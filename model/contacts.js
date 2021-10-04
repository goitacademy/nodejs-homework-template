const mongoose = require('mongoose')
const { Schema } = mongoose

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\(?\d{3}\)? ?-? ?\d{3} ?-? ?\d{4}$/
      },
      message: (props) => `${props.value} invalid number`
    },
  },
  subscription: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    default: '',
  },
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact
