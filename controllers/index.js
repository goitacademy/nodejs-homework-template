const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateStatusContact,
} = require("./contacts");

const { register, login, getCurrent, logout } = require("./auth");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
  updateStatusContact,
   register,
  login,
  getCurrent,
  logout,
};