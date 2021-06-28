const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const contactsSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    }
})

contactsSchema.plugin(mongoosePaginate)

const Contacts = mongoose.model('Contacts', contactsSchema)

module.exports = {
  Contacts
}