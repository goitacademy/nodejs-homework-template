const getAllContacts = require('./getContacts');
const getContactById = require('./getContact');
const createContact = require('./createContact');
const updateContact = require('./updateContact');
const removeContact = require('./removeContact');
const updateContactStatus = require('./updateContactStatus');

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateContactStatus,
};
