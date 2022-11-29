const { Schema, model } = require('mongoose');

const contact = new Schema({
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
});

contact.index({name: 1})

const Contact = model('contact', contact);

module.exports = { Contact };
