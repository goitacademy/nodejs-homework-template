const { login, logout, signup } = require('./auth');
const { current, subscription } = require('./users');

const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  removeContact,
} = require('./contacts');

module.exports = {
  current,
  login,
  logout,
  signup,
  subscription,
  getContacts,
  getContactById,
  addContact,
  updateContact,
  updateFavorite,
  removeContact,
};
