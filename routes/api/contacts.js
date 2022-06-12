
const express = require('express');
const { contactsApi } = require('../../controllers');
const router = express.Router();
const {joiSchema, joiFavoriteSchema} = require("../../models")
const {auth, ctrlWrapper, validation} = require('../../middlewares')

router.get('/', auth, ctrlWrapper(contactsApi.listContacts));

router.get('/:contactId', auth,  ctrlWrapper(contactsApi.getContactById));

router.post('/', auth, validation(joiSchema), ctrlWrapper(contactsApi.addContact));

router.delete('/:contactId', auth, ctrlWrapper(contactsApi.removeContact));

router.put('/:contactId', auth, ctrlWrapper(contactsApi.updateContact));

router.patch('/:contactId/favorite', auth, validation(joiFavoriteSchema), ctrlWrapper(contactsApi.updateStatusContact));

module.exports = router