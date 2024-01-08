const express = require('express');

const contactsController = require('../../controllers/contactsController');

const validate = require('../../middlewares/validate');
const { schemas } = require('../../models/index');
const { isValidId } = require('../../middlewares');

const router = express.Router();

router.get('/', contactsController.listContacts);

router.get('/:contactId', isValidId, contactsController.getContactById);

router.post(
  '/',
  validate(schemas.validateContacts),
  contactsController.addNewContact
);

router.delete('/:contactId', isValidId, contactsController.deleteContactById);

router.put(
  '/:contactId',
  isValidId,
  validate(schemas.validateContacts),
  contactsController.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validate(schemas.validateFavorite),
  contactsController.updateFavoritesStatus
);

module.exports = router;
