const { model } = require('mongoose');

const { contact } = require('./schemas');
const { schemaContact } = contact;
const Contact = model('contact', schemaContact);

module.exports = Contact;
