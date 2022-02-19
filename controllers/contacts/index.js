const getContacts = require('./getContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const putContact = require('./putContact');
const patchContact = require('./patchContact');
const deleteContact = require('./deleteContact');

module.exports = {
  getContacts,
  getContactById,
  addContact,
  putContact,
  patchContact,
  deleteContact,
};
