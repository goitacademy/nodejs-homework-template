const {
  getAllContacts,
  getContactByID,
  addContact,
  updateContact,
  deleteContactByID,
  updateStatus,
} = require('./contacts');
const { signup, login } = require('./users');

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  updateContact,
  deleteContactByID,
  updateStatus,
  signup,
  login,
};
