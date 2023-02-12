const getAllContacts = require('./contacts/getAll');
const getContactById = require('./contacts/getContactById');
const addContact = require('./contacts/addContact');
const deleteContact = require('./contacts/deleteContact');
const updateContact = require('./contacts/updateContact');
const favoriteUpdate = require('./contacts/favoriteUpdate');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  favoriteUpdate,
};
