const express = require('express');

const contactsController = require('../../controllers/contactsController');

const validate = require('../../middlewares/validate');
const { validateContacts } = require('../../models/index');

const router = express.Router();

router.get('/', contactsController.listContacts);

router.get('/:contactId', contactsController.getContactById);

router.post('/', validate(validateContacts), contactsController.addNewContact);

router.delete('/:contactId', contactsController.deleteContactById);

router.put(
  '/:contactId',
  validate(validateContacts),
  contactsController.updateContact
);

router.patch('/:contactId/favorite', contactsController.updateFavoritesStatus);

module.exports = router;
