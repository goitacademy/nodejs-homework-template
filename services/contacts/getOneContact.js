// ./services/contacts/getOneContact.js

const { Contact } = require('../../models');

/**
 * Знайти контакт за ідентифікатором.
 */
const getOneContact = (id) => Contact.findById(id);

module.exports = getOneContact;
