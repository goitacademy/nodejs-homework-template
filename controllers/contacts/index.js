const addContact = require('./addContact');
const getAll = require('./getAllContacts');
const getContactById = require('./getOneContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateContactStatus = require('./updateContactStatus');

module.exports = {
  addContact,
  getAll,
  getContactById,
  removeContact,
  updateContact,
  updateContactStatus,
};
