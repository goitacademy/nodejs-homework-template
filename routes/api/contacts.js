const express = require('express');

const ctrlContacts = require('../../controllers/contacts');
const {
  validateBody,
  validateFavorite,
  isValidId,
  authenticate,
} = require('../../middlewares');
const schemas = require('../../schemas/contacts');

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlContacts.getAll);

router.get('/:contactId', isValidId, ctrlContacts.getById);

router.post('/', validateBody(schemas.addContactSchema), ctrlContacts.add);

router.delete('/:contactId', isValidId, ctrlContacts.deleteById);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addContactSchema),
  ctrlContacts.updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrlContacts.updateStatusContact
);

module.exports = router;
