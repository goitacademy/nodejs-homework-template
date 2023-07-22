// ./services/contacts/createContact.js

const { Contact } = require('../../models');

/**
 * Перевірка, чи існує контакт.
 */
const checkContactExists = (field) => Contact.exists(field);

module.exports = checkContactExists;
