const listContacts = require('./get-contactsList');
const getContactById = require('./get-contactById');
const removeContact = require('./remove-contactById');
const addContact = require('./add-contact');
const updateContact = require('./update-contactById');
const updateStatusContact = require('./update-сontactStatus');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
