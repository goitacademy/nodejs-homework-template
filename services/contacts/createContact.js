// ./services/contacts/createContact.js

const Contact = require('../../models/contacts');

/**
 * Створити новий контакт.
 */
const createContact = (fields) => Contact.create(fields);

module.exports = createContact;
