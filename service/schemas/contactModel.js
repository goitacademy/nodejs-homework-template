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
    require: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});
contact.set('versionKey', false);

const Contact = model('contact', contact);
module.exports = Contact;
