const express = require('express');

const {
  getAll,
  getContact,
  createContact,
  deleteContact,
  renewContact,
  updateStatusContact,
  getFavoriteContacts,
} = require('../../controllers/contacts');

const router = express.Router();

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { addSchema, addSchemaRequired, updateStatusContactSchema } = require('../../models/contact');

router.get('/', authenticate, (req, res) => {
  if (req.query.favorite === 'true') {
    return getFavoriteContacts(req, res);
  }
  return getAll(req, res);
});

router.get('/:contactId', authenticate, isValidId, getContact);

router.post('/', authenticate, validateBody(addSchemaRequired), createContact);

router.delete('/:contactId', authenticate, isValidId, deleteContact);

router.put('/:contactId', authenticate, isValidId, validateBody(addSchema), renewContact);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
