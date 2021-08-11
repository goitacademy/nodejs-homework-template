const { Router } = require('express');
const router = Router();
const contactsController = require('../../controllers/contacts/contacts.controllers');

router.get('/', contactsController.listContacts);
router.get('/:contactId', contactsController.getContactById);
router.post('/', contactsController.addContact);
router.put('/:contactId', contactsController.updateContactById);
router.delete('/:contactId', contactsController.deleteContactById);
router.patch('/:contactId/favorite', contactsController.updateStatusContact);

module.exports = router;