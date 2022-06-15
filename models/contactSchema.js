const {Schema, model} = require('mongoose')
const {codeRegexp} = require('./constants')

const contactSchema = Schema({
  name: {
    type: String,
   // required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    match: codeRegexp
  },
  favorite: {
    type: Boolean,
    default: false,
  }
})

const Contact = model('contact', contactSchema)

module.exports = {Contact}
