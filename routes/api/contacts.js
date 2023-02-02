const { json } = require('express');
const express = require('express');
const {
  schemaAddContact,
  schemaUpdateContact,
} = require('../../schemas/contacts');
const { validateContact } = require('../../middlewares/validateContact');
const {
  controllerGetContacts,
  controllerGetContactById,
  controllerPostContact,
  controllerDeleteContact,
  controllerPutContact,
} = require('../../controllers/controllers');


const router = express.Router();


router.get('/contacts', controllerGetContacts);
router.get('/contacts/:contactId', controllerGetContactById);
router.post(
  '/contacts',
  validateContact(schemaAddContact),
  controllerPostContact
);
router.delete('/contacts/:contactId', controllerDeleteContact);
router.put(
  '/contacts/:contactId',
  validateContact(schemaUpdateContact),
  controllerPutContact
);

module.exports = router;
