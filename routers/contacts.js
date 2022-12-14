const express = require('express');
const ContactsController = require('../controllers/contacts');

const router = express.Router();

router.get('/', ContactsController.getContacts);
router.get('/:contactId', ContactsController.getContactById);
router.post('/', ContactsController.addContact);
router.delete('/:contactId', ContactsController.deleteContactById);
router.put('/:contactId', ContactsController.updateContactById);
router.put('/:contactId/favorite', ContactsController.updateStatusContact);

module.exports = router;

