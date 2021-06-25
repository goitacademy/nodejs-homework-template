const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactsSchema = new Schema({
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
})

const ContactsModel = mongoose.model('Contacts', contactsSchema)

module.exports = {
  ContactsModel,
}
