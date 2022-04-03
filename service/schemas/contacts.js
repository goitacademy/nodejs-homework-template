const Schema = require("../mongoose-db.js")
const mongoose = require('mongoose')

const contactSchema = new Schema({
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
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  })
  
  const Contacts = mongoose.model('contacts', contactSchema)
  
  module.exports = Contacts