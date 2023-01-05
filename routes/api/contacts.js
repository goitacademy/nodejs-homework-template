const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper, authenticate } = require('../../middlewares');
const { contactsSchema } = require('../../schemas');
const { contactsCtrl } = require('../../controllers');

const validateMiddleware = validation(contactsSchema);

router.get('/', authenticate, ctrlWrapper(contactsCtrl.getAllContacts));

router.get('/:contactId', authenticate, ctrlWrapper(contactsCtrl.getContactById));

router.post('/', authenticate, validateMiddleware, ctrlWrapper(contactsCtrl.addContact));

router.delete('/:contactId', authenticate, ctrlWrapper(contactsCtrl.removeContactById));

router.put('/:contactId', authenticate,  validateMiddleware, ctrlWrapper(contactsCtrl.updateContactById));

router.patch('/:contactId/favorite', authenticate, ctrlWrapper(contactsCtrl.updateStatusContact));

module.exports = router;
