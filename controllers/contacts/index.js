const getAllContacts = require('./getAllContacts');
const getContact = require('./getContact');
const addContact = require('./addContact');
const deleteContact = require('./deleteContact');
const updateContactById = require('./updateContactById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getAllContacts,
  getContact,
  addContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
};
