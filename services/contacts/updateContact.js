// ./services/contacts/removeContact.js

const { Contact } = require('../../models');

/**
 * Оновити контакт.
 */
const updateContact = (id, fields) =>
  Contact.findByIdAndUpdate(id, fields, { new: true });

module.exports = updateContact;
