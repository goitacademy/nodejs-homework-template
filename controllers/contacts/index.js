const listContacts = require('./listContacts');
const getById = require('./getById');
const addContact = require('./addContact');
const removeContact = require('./removeContact');
const updateContact = require('./updateContact');
const updateStatusContact = require('./updateStatusContact');
const { ctrlWrapper } = require("../../helpers");

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
