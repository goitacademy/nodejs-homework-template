// ./services/contacts/index.js

/**
 * Виконання операцій над базою даних
 */

const createContact = require('./createContact');
const getAllContacts = require('./getAllContacts');
const getOneContact = require('./getOneContact');
const updateContact = require('./updateContact');
const removeContact = require('./removeContact');
const updateStatus = require('./updateStatus');
const checkContactExists = require('./checkContactExists');
const getFavoriteContacts = require('./getFavoriteContacts');

module.exports = {
  createContact,
  getAllContacts,
  getOneContact,
  removeContact,
  updateContact,
  updateStatus,
  checkContactExists,
  getFavoriteContacts,
};
