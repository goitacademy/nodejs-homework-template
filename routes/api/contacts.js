const express = require('express');
const router = express.Router();

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schemas');
const { contacts } = require('../../controllers');

router.get('/', ctrlWrapper(contacts.getAll));

router.get('/:contactId', ctrlWrapper(contacts.getById));

router.post(
  '/',
  validation(contactSchema.addContactSchema),
  ctrlWrapper(contacts.add)
);

router.delete('/:contactId', ctrlWrapper(contacts.removeById));

router.put(
  '/:contactId',
  validation(contactSchema.updateContactSchema),
  ctrlWrapper(contacts.updateById)
);

module.exports = router;
