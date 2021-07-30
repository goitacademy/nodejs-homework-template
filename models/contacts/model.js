const { model } = require('mongoose');
const contactSchema = require('./schema');

const Contact = model('contact', contactSchema);

module.exports = Contact;
