const express = require('express');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} = require('../../controllers/contacts');
const {
  addSchema,
  updateSchema,
  updateStatusContactSchema,
} = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, getAll);

router.get('/:contactId', authenticate, isValidId, getById);

router.post('/', authenticate, validateBody(addSchema), add);

router.delete('/:contactId', authenticate, isValidId, deleteById);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(updateSchema),
  updateById
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
