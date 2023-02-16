const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactElement,
} = require('./contactsModels');

const { User } = require('./usersModels');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactElement,
  User,
};
