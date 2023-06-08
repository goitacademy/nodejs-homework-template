const getAllContacts = require('./getAllContacts');

const getContactById = require('./getContactById');

const addContact = require('./addContact');

const updateStatusContact = require('./updateStatusContact');

const updateContactById = require('./updateContactById');

const deleteContactById = require('./deleteContactById');

const { ctrlWrapper } = require('../../dec');

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
