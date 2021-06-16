const express = require('express');
const router = express.Router();
const {
  validateCreateContact,
  validateUpdateContact,
} = require('../../services/validation');
const {
  controllerGetAllContacts,
  controllerGetContactById,
  controllerCreateContact,
  controllerDeleteContact,
  controllerUpdateContact,
} = require('../../contactsController/contactsController');

router.get('/', controllerGetAllContacts);
router.get('/:contactId', controllerGetContactById);
router.post('/', validateCreateContact, controllerCreateContact);
router.delete('/:contactId', controllerDeleteContact);
router.patch('/:contactId', validateUpdateContact, controllerUpdateContact);

module.exports = router;
