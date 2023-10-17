const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContact,
  getFavoriteContacts,
} = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { addSchema } = require('../../models/contacts');

router.get('/', listContacts);
router.get('/favorite', getFavoriteContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateBody(addSchema), addContact);
router.put('/:contactId', isValidId, validateBody(addSchema), updateContactById);
router.delete('/:contactId', isValidId, deleteContact);

module.exports = router;
