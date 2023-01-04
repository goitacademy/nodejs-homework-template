const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const postNewContact = require('./postNewContact');
const putContactById = require('./putContactById');
const delContactById = require('./delContactById');
const updateFavorite = require('./updateFavorite');

module.exports = {
  getAllContacts,
  getContactById,
  postNewContact,
  putContactById,
  delContactById,
  updateFavorite,
};
