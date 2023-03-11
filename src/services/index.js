const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("./contactsService");

const {
  checkUserDB,
  addNewUser,
  findUserById,
  updateUser,
} = require("./authService");

module.exports = {
  checkUserDB,
  addNewUser,
  findUserById,
  updateUser,
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
