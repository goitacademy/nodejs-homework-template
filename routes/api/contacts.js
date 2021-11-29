const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper } = require('../../middlewares');

const {
  getAll,
  getById,
  putById,
  updateContacts,
  removeById,
  updateStatusContact,
} = require('../../controllers');

const { schema, statusSchema } = require('../../model/contact');

router.get('/', ctrlWrapper(getAll));
router.get('/:contactId', ctrlWrapper(getById));
router.post('/', validation(schema), ctrlWrapper(updateContacts));
router.put('/:contactId', validation(schema), ctrlWrapper(putById));
router.patch('/:contactId/favorite', validation(statusSchema), ctrlWrapper(updateStatusContact));
router.delete('/:contactId', ctrlWrapper(removeById));

module.exports = router;
