const { Schema, model } = require('mongoose');

const contactsSchema = Schema(
  {
    name: { type: String, required: [true, 'Set name for contact'] },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model('contact', contactsSchema);

module.exports = Contact;
