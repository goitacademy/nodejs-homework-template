const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper, authenticate } = require('../../middlewares');

const {
  getAll,
  getById,
  putById,
  updateContacts,
  removeById,
  updateStatusContact,
} = require('../../controllers');

const { contact } = require('../../model');
const { schema, statusSchema } = contact;

router.get('/', authenticate, ctrlWrapper(getAll));
router.get('/:contactId', ctrlWrapper(getById));
router.post('/', authenticate, validation(schema), ctrlWrapper(updateContacts));
router.put('/:contactId', validation(schema), ctrlWrapper(putById));
router.patch('/:contactId/favorite', validation(statusSchema), ctrlWrapper(updateStatusContact));
router.delete('/:contactId', ctrlWrapper(removeById));

module.exports = router;
