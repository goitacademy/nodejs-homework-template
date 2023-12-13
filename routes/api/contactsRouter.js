const express = require('express');

const router = express.Router();
const { contactsController } = require('../../controllers');
const { contactsValidation } = require('../../units');

router
  .route('/')
  .get(contactsController.getAllContacts)
  .post(contactsController.createContact);

// router.use('/:contactId', contactsValidation.checkContact);
router
  .route('/:contactId')
  .get(contactsController.getById)
  .delete (contactsController.removeContact)
  .put(contactsController.updateContact);

module.exports = router;
