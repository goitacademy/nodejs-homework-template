const express = require('express');

const contactController = require('../../controllers/contacts-controllers');
const { validateBody } = require('../../decoraters/validateBody');
const { validateBodyPatch } = require('../../decoraters/validateBodyPatch');
const schema = require('../../schemas/contact-schemes');

const { isValidId, authenticate } = require('../../middlewares');

const router = express.Router();

router.use(authenticate);

router.get('/', contactController.getAll);

router.get('/:contactId', isValidId, contactController.getContactById);

router.post(
  '/',
  validateBody(schema.addContactSchema),
  contactController.addNewContact
);

router.delete('/:contactId', isValidId, contactController.deleteContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schema.addContactSchema),
  contactController.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBodyPatch(schema.contactUpdateFavoriteSchema),
  contactController.updateStatusContact
);

module.exports = router;
