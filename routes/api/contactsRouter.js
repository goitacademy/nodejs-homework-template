const { json } = require('express');
const express = require('express');
const {
  schemaAddContact,
  schemaUpdateContact,
  schemaUpdateFavorite,
} = require('../../schemas/validateShemaContact');
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
const { authMiddleware } = require('../../middlewares/authMiddleware');

const router = express.Router();

// router.use(authMiddleware);

router.get('/contacts', authMiddleware, controllerGetContacts);
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
