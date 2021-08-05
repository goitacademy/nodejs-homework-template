const { model } = require('mongoose');

const { contactShema } = require('./schemas');

const Contact = model('contact', contactShema);

module.exports = Contact;
