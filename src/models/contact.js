const { model } = require('mongoose');

const contactSchema = require('../schemas/databaseContactSchema');

const Contact = model('contact', contactSchema);

module.exports = Contact;
