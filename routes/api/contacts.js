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

const { validateBody, isValidId } = require('../../middlewares');

const { addSchema, addSchemaRequired, updateStatusContactSchema } = require('../../models/contact');

router.get('/', getAll);

router.get('/:contactId', isValidId, getContact);

router.post('/', validateBody(addSchemaRequired), createContact);

router.delete('/:contactId', isValidId, deleteContact);

router.put('/:contactId', isValidId, validateBody(addSchema), renewContact);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
