const addContact = require('./addContact');
const listContacts = require('./getListContacts');
const getContactById = require('./getContactById');
const removeContact = require('./removeContactById');
const updateContact = require('./updateContacts');
const updateById = require('./updateById');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateById,
};
