const { Schema, model } = require('mongoose');

const schema = new Schema({
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
  })

// model('', schema);

const Contact = model('contact', schema);

module.exports = Contact;