const express = require('express');

const validation = require('../../middlewares/validation');
const contactsSchema = require('../../schemas/contacts-schema');
const {
  getAll,
  getById,
  add,
  updateById,
  removeById,
} = require('../../controllers/contacts');

const router = new express.Router();

const validateMiddleware = validation(contactsSchema);

router.get('/', getAll);
router.get('/:contactId', getById);
router.post('/', validateMiddleware, add);
router.delete('/:contactId', removeById);
router.put('/:contactId', validateMiddleware, updateById);

module.exports = router;
