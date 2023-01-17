const getContacts = require('./getContacts');
const getContact = require('./getContact');
const createContact = require('./createContact');
const deleteContact = require('./deleteContact.js');
const updateSomeContact = require('./updateSomeContact.js');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateSomeContact,
  updateStatusContact,
};
