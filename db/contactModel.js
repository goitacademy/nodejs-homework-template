const mongoose = require('mongoose')

const contactSchemaMongoose = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Set email']
  },
  phone: {
    type: String,
    required: [true, 'Set phone number']
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }
})

const ContactModel = mongoose.model('contacts', contactSchemaMongoose)

module.exports = {
  ContactModel
}
