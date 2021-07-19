const { model } = require('mongoose');
const contactSchema = require('./schema/contact');
const Contact = model('contact', contactSchema);

module.exports = Contact;