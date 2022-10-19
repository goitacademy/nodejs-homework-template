const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContacts = require('./addContact');
const deleteContact = require('./deleteContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateFavorite');

module.exports = {
  getAllContacts,
  getContactById,
  addContacts,
  deleteContact,
  updateContact,
  updateStatusContact,
};
