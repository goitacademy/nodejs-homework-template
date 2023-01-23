const { login, logout, register } = require("./auth");
const {
  getContact,
  getListOfContacts,
  editContact,
  deleteContact,
  createContact,
  updateStatusContact,
} = require("./contacts");
const { current, subscriptionUpdate } = require("./users");

module.exports = {
  login,
  logout,
  register,
  getContact,
  getListOfContacts,
  editContact,
  deleteContact,
  createContact,
  updateStatusContact,
  current,
  subscriptionUpdate,
};
