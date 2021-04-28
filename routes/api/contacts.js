const express = require('express');
const router = express.Router();
const contactsController = require('../../controller');
const { validateContact } = require('../../services/validation');

router
  .get('/', contactsController.listContacts)
  .post('/', validateContact, contactsController.addContact);

router
  .get('/:contactId', contactsController.getContactById)
  .delete('/:contactId', contactsController.removeContact)
  .patch('/:contactId', validateContact, contactsController.updateContact);

router.patch(
  '/:contactId/favorite',
  validateContact,
  contactsController.updateFavoriteContact,
);
module.exports = router;
