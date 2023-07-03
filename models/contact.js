const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
  name: { type: String, required: [true, 'Set name for contact'] },
  email: String,
  phone: String,
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;
