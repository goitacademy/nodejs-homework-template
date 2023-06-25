const { getAllContacts } = require('./getAllContacts');
const { getContactById } = require('./getContactById');
const { deleteContact } = require('./deleteContact');
const { postContact } = require('./postContact');
const { putContact } = require('./putContact');

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
};
