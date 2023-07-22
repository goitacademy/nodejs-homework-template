// ./services/contacts/index.js

const createContact = require('./createContact');
const getAllContacts = require('./getAllContacts');
const getOneContact = require('./getOneContact');
const updateContact = require('./updateContact');
const removeContact = require('./removeContact');
const updateStatus = require('./updateStatus');
const checkContactExists = require('./checkContactExists');

module.exports = {
  createContact,
  getAllContacts,
  getOneContact,
  removeContact,
  updateContact,
  updateStatus,
  checkContactExists,
};
