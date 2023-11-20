const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contactsController');

router.get('/', contactsController.listContacts);
router.get('/:id', contactsController.getContactById);
router.post('/', contactsController.addContact);
router.delete('/:id', contactsController.removeContact);
router.put('/:id', contactsController.updateContact);
router.patch('/:contactId/favorite', contactsController.updateStatusContact);

module.exports = router;
