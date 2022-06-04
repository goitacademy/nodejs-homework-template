const getContactsList = require('./getContactsList');
const getContactById = require('./getContactsById');
const postAddContacts = require('./postAddContacts');
const removeContactsById = require('./removeContactsById');
const updateContactsById = require('./updateContactsById');

module.exports = {
  getContactsList,
  getContactById,
  postAddContacts,
  removeContactsById,
  updateContactsById,
};
