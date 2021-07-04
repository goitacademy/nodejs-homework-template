const mongoose = require('mongoose')

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
  userId: {
    type: String,
    required: [true, 'Set id of user'],
  },
  //   owner: {
  //     type: SchemaTypes.ObjectId,
  //     ref: 'user',
  //   },
})
const Contact = mongoose.model('Contact', contactsSchema)

module.exports = { Contact }
