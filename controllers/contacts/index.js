const { ctrlWrapper } = require('../../helpers');

const addContact = require('./addContact');
const getContactByID = require('./getContactsByID');
const listContacts = require('./listContacts');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateFavorite = require('./updateFavorite');

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactByID: ctrlWrapper(getContactByID),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
};
