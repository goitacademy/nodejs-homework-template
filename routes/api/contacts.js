const express = require('express')
const router = express.Router()
const contactsCtrl = require("../../controllers");
const {validation} = require("../../middewares");
const {ctrlWrapper} = require("../../middewares");

const {joiContactSchema, joiStatusSchema} = require("../../models");

router.get('/', ctrlWrapper(contactsCtrl.listContacts));

router.get('/:contactId', ctrlWrapper(contactsCtrl.getById));

router.post('/', validation(joiContactSchema), ctrlWrapper(contactsCtrl.addContact));

router.delete('/:contactId', ctrlWrapper(contactsCtrl.removeContact));

router.put('/:contactId', validation(joiContactSchema), ctrlWrapper(contactsCtrl.updateContact));

router.patch('/:contactId/favorite', validation(joiStatusSchema), ctrlWrapper(contactsCtrl.updateStatusContact));

module.exports = router;
