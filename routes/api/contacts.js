const express = require('express');

const router = express.Router();

const ctrlContacts = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const { contactsSchema } = require('../../schemas/contacts');

router.get('/', ctrlContacts.getAll);

router.get('/:contactId', ctrlContacts.getById);

router.post('/', validateBody(contactsSchema), ctrlContacts.add);

router.delete('/:contactId', ctrlContacts.deleteById);

router.put(
  '/:contactId',
  validateBody(contactsSchema),
  ctrlContacts.updateById
);

module.exports = router;
