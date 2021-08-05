const listContacts = require('./listContacts.js');
const getContactById = require('./getContactById.js');
const addContact = require('./addContact.js');
const updateContact = require('./updateContact.js');
const removeContact = require('./removeContact.js');
const updateContactStatus = require('./updateContactStatus.js');

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateContactStatus,
};
