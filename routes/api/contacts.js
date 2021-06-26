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
} = require('../../controllers/contactsController');

const guard = require('../../helpers/guard');

router.get('/contacts', guard, controllerGetAllContacts);
router.get('/contacts/:contactId', guard, controllerGetContactById);
router.post('/contacts', guard, validateCreateContact, controllerCreateContact);
router.delete('/contacts/:contactId', guard, controllerDeleteContact);
router.patch(
  '/contacts/:contactId',
  guard,
  validateUpdateContact,
  controllerUpdateContact,
);

module.exports = router;
