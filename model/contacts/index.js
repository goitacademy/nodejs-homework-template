const addContact = require('./addContact');
const getContactById = require('./getContactById');
const listContacts = require('./listContacts');
const removeContact = require('./removeContact');
const updateContactById = require('./updateContactById');
const updateContacts = require('./updateContacts');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateContacts,
};