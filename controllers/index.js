const getContactsList = require('./getContactsList');
const getOneContact = require('./getOneContact');
const postContact = require('./postContact');
const deleteContact = require('./removeContact');
const putContact = require('./putContact');
const patchFavorite = require('./patchFavorite');

module.exports = {
  getContactsList,
  getOneContact,
  postContact,
  deleteContact,
  putContact,
  patchFavorite,
};