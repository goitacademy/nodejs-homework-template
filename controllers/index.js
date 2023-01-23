const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contacts");

const {
  signUp,
  logIn,
  logOut,
  current,
  avatar,
  verify,
  resendVerify,
} = require("../controllers/authorization");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  signUp,
  logIn,
  logOut,
  current,
  avatar,
  verify,
  resendVerify,
};
