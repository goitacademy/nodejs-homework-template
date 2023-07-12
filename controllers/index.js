const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("./contacts");

const {
  register,
  login,
  getCurrent,
  logout,
  subscription,
  addAvatar,
} = require("./auth");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
  register,
  login,
  getCurrent,
  logout,
  subscription,
  addAvatar,
};
