const express = require('express');
const router = express.Router();
const { contactsController } = require('../../controller');
const auth = require('../../middlewares/auth');

router.get('/', auth, contactsController.listContacts);

router.get('/:contactId', auth, contactsController.getContactById);

router.post('/', auth, contactsController.addContact);

router.delete('/:contactId', auth, contactsController.removeContact);

router.put('/:contactId', auth, contactsController.updateContact);

router.patch('/:contactId/favorite', auth, contactsController.updateStatusContact);

module.exports = router;