const { Schema, model } = require('mongoose')
const contactsSchema = Schema({
  name: String,
  phone: String,
  email: String,
})

const contact = model('telephone_directory', contactsSchema)

module.exports = contact
