const { Schema, model } = require('mongoose');

const contactSchema = Schema({
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
      enum: [false, true],
    default: false,
  }
})

const Contact = model('contact', contactSchema);
module.exports = Contact;