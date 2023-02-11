const { controllerGetContacts } = require('./controllerGetContacts');
const { controllerGetContactById } = require('./controllerGetContactById');
const { controllerPostContact } = require('./controllerPostContact');
const { controllerDeleteContact } = require('./controllerDeleteContact');
const { controllerPutContact } = require('./controllerPutContact');
const { controllerPatchFavorite } = require('./controllerPatchFavorite');

module.exports = {
  controllerGetContacts,
  controllerGetContactById,
  controllerPostContact,
  controllerDeleteContact,
  controllerPutContact,
  controllerPatchFavorite,
};
