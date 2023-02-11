const { json } = require('express');
const express = require('express');
const {
  schemaAddContact,
  schemaUpdateContact,
  schemaUpdateFavorite,
} = require('../../schemas/contacts');
const {
  validateContact,
  validateFavorite,
} = require('../../middlewares/validateContact');
const {
  controllerGetContacts,
  controllerGetContactById,
  controllerPostContact,
  controllerDeleteContact,
  controllerPutContact,
  controllerPatchFavorite,
} = require('../../controllers/contacts');

const router = express.Router();

router.get('/contacts', controllerGetContacts);
router.get('/contacts/:contactId', controllerGetContactById);
router.post(
  '/contacts',
  validateContact(schemaAddContact),
  controllerPostContact
);
router.delete('/contacts/:contactId', controllerDeleteContact);
router.put(
  '/contacts/:contactId',
  validateContact(schemaUpdateContact),
  controllerPutContact
);
router.patch(
  '/contacts/:contactId/favorite',
  validateFavorite(schemaUpdateFavorite),
  controllerPatchFavorite
);

module.exports = router;
