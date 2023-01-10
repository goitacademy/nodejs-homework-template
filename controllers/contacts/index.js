const getAllContacts = require('./getAll');
const getContactById = require('./getById');
const addContact = require('./add');
const deleteContact = require('./deleteContact');
const updateContact = require('./updateById');
const updateContactFavorite = require('./updateFavorite');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateContactFavorite,
};
