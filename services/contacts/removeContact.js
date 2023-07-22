// ./services/contacts/removeContact.js

const { Contact } = require('../../models');

/**
 * Видалити контакт.
 */
const removeContact = (id) => Contact.findByIdAndDelete(id);

module.exports = removeContact;
