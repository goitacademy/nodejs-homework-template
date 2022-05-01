const express = require('express')
const router = express.Router()
const contactsCtrl = require("../../controllers");
const {validation} = require("../../middewares");
const {ctrlWrapper} = require("../../middewares");
const contactSchema = require("../../schemas");

router.get('/', ctrlWrapper(contactsCtrl.listContacts));

router.get('/:contactId', ctrlWrapper(contactsCtrl.getById));

router.post('/', validation(contactSchema), ctrlWrapper(contactsCtrl.addContact));

router.delete('/:contactId', ctrlWrapper(contactsCtrl.removeContact));

router.put('/:contactId', validation(contactSchema), ctrlWrapper(contactsCtrl.updateContact));

module.exports = router
