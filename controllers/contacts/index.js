const { ctrlWrapper } = require('../../helpers');

const addContact = require('./addContact');
const getContactById = require('./getContactById');
const getContacts = require('./getContacts');
const updateContact = require('./updateContact');
const setFavorite = require('./setFavorite');
const removeContact = require('./removeContact');

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  updateStatus: ctrlWrapper(setFavorite),
};
