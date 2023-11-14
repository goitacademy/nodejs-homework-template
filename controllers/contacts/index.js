const getContacts = require('./get');
const getContactById = require('./getById');
const createContact = require('./post');
const updateContact = require('./put');
const path = require('./path');
const removeContact = require('./del');

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  path,
  removeContact,
};
