// ./controllers/contacts/index.js

/**
 * Контролери
 */

const createContact = require('./createContact');
const getAllContacts = require('./getAllContacts');
const getOneContact = require('./getOneContact');
const updateContact = require('./updateContact');
const removeContact = require('./removeContact');
const updateStatus = require('./updateStatus');

module.exports = {
  createContact,
  getAllContacts,
  getOneContact,
  removeContact,
  updateContact,
  updateStatus,
};
