const express = require('express');

const { validateBody, isValidId } = require('../middlewares');

const { contactSchema, updateFavoriteSchema } = require('../schemas');

const {
  contacts: {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
  },
} = require('../controllers');

const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(contactSchema), addContact);

router.delete('/:contactId', isValidId, removeContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(contactSchema),
  updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
