const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const postContact = require('./postContact');
const putContactUpdate = require('./putContactUpdate');
const deleteContactById = require('./deleteContactById');

module.exports = {
  getAllContacts,
  getContactById,
  postContact,
  putContactUpdate,
  deleteContactById,
};
