const {Schema, model} = require('mongoose');

const contactsSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
});

const Contact = model('contact', contactsSchema );

module.exports = Contact;