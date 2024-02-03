const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers');
const { isValidId } = require('../../helpers');

const { validateBody } = require('../../helpers');
const { schemas } = require('../../models/contact');

router.get('/', getAllContacts);

router.get('/:id', isValidId, getOneContact);

router.post('/', validateBody(schemas.createContactSchema), createContact);

router.put(
  '/:id',
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

router.delete('/:id', isValidId, deleteContact);

module.exports = router;
