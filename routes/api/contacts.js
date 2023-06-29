const express = require('express');

const { isValidId, validateBody } = require('../../middlewares');
const { updateFavoriteShema } = require('../../models/JoiSchemas/contact');

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts');

const router = express.Router();

router.get('/', listContacts);

router.get('/:id', isValidId, getContactById);

router.post('/', addContact);

router.put('/:id', isValidId, updateContact);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteShema),
  updateStatusContact
);

router.delete('/:id', isValidId, removeContact);

module.exports = router;
