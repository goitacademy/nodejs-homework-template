const { listContacts } = require('./listContacts');
const { getContactById } = require('./getContactById');
const { addContact } = require('./addContact');
const { removeContact } = require('./removeContact');
const { updateStatusContact } = require('./updateStatusContact');
const { updateContact } = require('./updateContact');

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
};
