const { login, logout, signup, subscription } = require('./auth');
const current = require('./users');

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
