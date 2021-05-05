const { Schema, model, SchemaTypes } = require('mongoose')

const contactsSchema = new Schema({
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
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
}, {
    versionKey: false,
    timestamps: true,
})
  
const Contacts = model('contact', contactsSchema)

module.exports = Contacts