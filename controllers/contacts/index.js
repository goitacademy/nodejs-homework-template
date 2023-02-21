const { ctrlWrapper } = require('../../helpers');

const addContact = require('./addContact');
const getContactById = require('./addContact');
const getContacts = require('./addContact');
const updateContact = require('./addContact');
const setFavorite = require('./addContact');
const removeContact = require('./addContact');

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  updateStatus: ctrlWrapper(setFavorite),
};
