const addContact = require('./addContact');
const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const deleteContact = require('./deleteContact');
const correctContact = require('./correctContact');
const updateContact = require('./updateContact');

module.exports = {
  getContacts,
  addContact,
  getContactById,
  deleteContact,
  correctContact,
  updateContact,
};
