const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('./contactsManager');
const validateContact = require('./contactsVerification');

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  validateContact,
};
