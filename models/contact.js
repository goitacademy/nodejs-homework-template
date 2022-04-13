const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { LIMIT_NUMBERS_CONTACT } = require('../libs/constans');

const contactSchema = new Schema({
  name: { type: String, required: [true, 'Set name for contact'] },
  email: { type: String },
  phone: {
    type: String,
    min: LIMIT_NUMBERS_CONTACT.min,
    max: LIMIT_NUMBERS_CONTACT.max,
    required: true,
  },
  favorite: { type: Boolean, default: false },
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
