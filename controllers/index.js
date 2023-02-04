const {
  getAllContacts,
  getContactByID,
  addContact,
  updateContact,
  deleteContactByID,
  updateStatus,
} = require('./contacts');
const { signup } = require('./users');

module.exports = {
  getAllContacts,
  getContactByID,
  addContact,
  updateContact,
  deleteContactByID,
  updateStatus,
  signup,
};
