const { addContact } = require('./contacts/addContact');
const { getContactById } = require('./contacts/getContactById');
const { listContacts } = require('./contacts/listContacts');
const { removeContact } = require('./contacts/removeContact');
const { updateContact } = require('./contacts/updateContact');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
