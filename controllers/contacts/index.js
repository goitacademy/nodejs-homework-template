const getAllContacts = require('./getAllContacts');

const getContactID = require('./getContactID');

const addContact = require('./addContact');

const updateStatusContact = require('./updateStatusContact');

const updateContactID = require('./updateContactID');

const deleteContactID = require('./deleteContactID');

const { ctrlWrapper } = require('../../dec');

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactID: ctrlWrapper(getContactID),
  addContact: ctrlWrapper(addContact),
  deleteContactID: ctrlWrapper(deleteContactID),
  updateContactID: ctrlWrapper(updateContactID),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
