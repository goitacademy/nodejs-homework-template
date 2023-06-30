const { getAllContacts } = require('./getAllContacts');
const { getContactById } = require('./getContactById');
const { addContact } = require('./addContact');
const { updateContact } = require('./updateContact');
const { updateStatusContact } = require('./updateStatusContact');
const { removeContact } = require('./removeContact');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
