const { getContactsList } = require('./getContactsList');
const { getContact } = require('././getContact');
const { deleteContact } = require('./deleteContact');
const { createContact } = require('./createContact');
const { changeContact } = require('./changeContact');

module.exports = {
  getContactsList,
  getContact,
  deleteContact,
  createContact,
  changeContact,
};
