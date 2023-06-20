const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("./contacts");

const {register, login} = require('./auth')

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
  register, login
};
