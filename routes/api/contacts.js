const express = require('express');
const router = express.Router();
const { validation } = require('../../middlewares');
const { contactsSchema } = require('../../schemas');
const { ctrlWrapper } = require('../../middlewares');
const { contactsCtrl } = require('../../controllers');

const validateMiddleware = validation(contactsSchema);

router.get('/', ctrlWrapper(contactsCtrl.getAllContacts));

router.get('/:contactId', ctrlWrapper(contactsCtrl.getContactById));

router.post('/', validateMiddleware, ctrlWrapper(contactsCtrl.addContact));

router.delete('/:contactId', ctrlWrapper(contactsCtrl.removeContactById));

router.put('/:contactId', validateMiddleware, ctrlWrapper(contactsCtrl.updateContactById));

module.exports = router;
