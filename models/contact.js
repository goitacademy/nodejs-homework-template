const { Schema, model } = require('mongoose');

const contactSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 14,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
