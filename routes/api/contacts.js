const express = require('express');

const contactsController = require('../../controllers/contactsController');
const validation = require('../../middlewares/validation');
const tryCatchMiddleware = require('../../middlewares/tryCatchMiddleware');
const contactSchema = require('../../schemas/contactsSchema.js');

const router = express.Router();

router.get('/', tryCatchMiddleware(contactsController.getAllContacts));

router.get('/:contactId', tryCatchMiddleware(contactsController.getOneContact));

router.post(
  '/',
  validation(contactSchema),
  tryCatchMiddleware(contactsController.addContact),
);

router.delete(
  '/:contactId',
  tryCatchMiddleware(contactsController.deleteContact),
);

router.put(
  '/:contactId',
  validation(contactSchema),
  tryCatchMiddleware(contactsController.updateContact),
);

module.exports = router;
