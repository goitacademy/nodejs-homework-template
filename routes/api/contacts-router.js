const express = require('express');
const { validateBody } = require('../../decorators/index');
const {
  contactAddSchema,
  contactUpdateSchema,
} = require('../../schemas/contact-schemas');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controller');

router.get('/', contactsController.getAll);

router.get('/:contactId', contactsController.getById);

router.post('/', validateBody(contactAddSchema), contactsController.addContact);

router.put(
  '/:contactId',
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

router.delete('/:contactId', contactsController.deleleteById);

module.exports = router;
