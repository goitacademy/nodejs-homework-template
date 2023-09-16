const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    minLength: 5,
    maxLength: 20,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
