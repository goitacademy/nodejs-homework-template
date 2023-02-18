const getAllContacts = require('./contacts/getAll');
const getContactById = require('./contacts/getContactById');
const addContact = require('./contacts/addContact');
const deleteContact = require('./contacts/deleteContact');
const updateContact = require('./contacts/updateContact');

const signUp = require('./users/signUp');
const login = require('./users/login');
const getCurrentUser = require('./users/getCurrentUser');
const logout = require('./users/logout');
const subscription = require('./users/subscription');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  favoriteUpdate,
  signUp,
  login,
  getCurrentUser,
  logout,
  subscription,
};
