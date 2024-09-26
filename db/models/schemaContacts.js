const { Schema, model } = require('mongoose')

const schemaContacts = new Schema({
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
  }, {timestamps:true, versionKey:false})


  const contactModel = model('contacts', schemaContacts)

  module.exports = contactModel;