// ./services/contacts/createContact.js

const Contact = require('../../models/contacts');

/**
 * Перевірка, чи існує контакт.
 */
const checkContactExists = (field) => Contact.exists(field);

module.exports = checkContactExists;
