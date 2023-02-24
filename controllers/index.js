const {
  listContacts,
  getById,
  removeContact,
  updateContact,
  addContact,
  updateStatusContact,
} = require("./contacts");

const {
  register,
  login,
  getCurrentUser,
  logout,
  updateSubscription,
} = require("./users");

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  listContacts,
  getById,
  removeContact,
  updateContact,
  addContact,
  updateStatusContact,
};
