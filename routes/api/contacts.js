const express = require('express');

const contactsController = require('../../controllers/contacts-controller');

const { schemas } = require('../../models/contact');
const { validateBody } = require('../../decorators');
const { isValidId, authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', authenticate, contactsController.getAllContacts);

router.get('/:id', authenticate, isValidId, contactsController.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete('/:id', authenticate, isValidId, contactsController.removeContact);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;

