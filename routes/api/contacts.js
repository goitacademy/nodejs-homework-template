const express = require('express');
const {
  getAll,
  getById,
  add,
  updateById,
  removeById,
} = require('../../controllers/contacts');
const { addContactSchema, updateContactSchema } = require('../../schemas');
const { validateBody } = require('../../middlewares');
const { ctrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', ctrlWrapper(getAll));

router.get('/:contactId', ctrlWrapper(getById));

router.post('/', validateBody(addContactSchema), ctrlWrapper(add));

router.delete('/:contactId', ctrlWrapper(removeById));

router.put(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(updateById)
);

module.exports = router;
