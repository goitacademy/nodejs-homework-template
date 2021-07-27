const listContact = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const updateContact = require('./updateContact');
const removeContact = require('./removeContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  listContact,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
