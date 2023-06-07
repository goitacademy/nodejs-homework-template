const {get} = require('../contacts/getAllContacts');
const {getById} = require('../contacts/getContactById');
const {create} = require('../contacts/addContact');
const {update} = require('../contacts/updateContact');
const {updateFavorite} = require('../contacts/updateContactStatus');
const {remove} = require('../contacts/deleteContact');

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
