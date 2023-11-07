const express = require('express');
const { validateBody, isValidId } = require('../../middlewares');
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

router.get('/', getAll);

router.get('/:contactId', isValidId, getById);

router.post('/', validateBody(addSchema), add);

router.delete('/:contactId', isValidId, deleteById);

router.put('/:contactId', isValidId, validateBody(updateSchema), updateById);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateStatusContactSchema),
  updateStatusContact
);

module.exports = router;
