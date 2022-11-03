const getContactsList = require('./getContactsList');
const getOneContact = require('./getOneContact');
const postContact = require('./postContact');
const delateContact = require('./removeContact');
const putContact = require('./putContact');
const patchFavorite = require('./patchFavorite');

module.exports = {
  getContactsList,
  getOneContact,
  postContact,
  delateContact,
  putContact,
  patchFavorite,
};
