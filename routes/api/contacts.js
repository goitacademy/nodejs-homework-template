const express = require('express');

const {
  getAll,
  getContact,
  createContact,
  deleteContact,
  renewContact,
  updateStatusContact,
} = require('../../controllers/contacts');

const router = express.Router();

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { addSchema, addSchemaRequired, updateStatusContactSchema } = require('../../models/contact');

router.get('/', authenticate, getAll);

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
