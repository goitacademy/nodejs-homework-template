const { model } = require('mongoose');
const contactsSchema = require('./contactsSchema');

const Contact = new model('contact', contactsSchema);

module.exports = Contact;