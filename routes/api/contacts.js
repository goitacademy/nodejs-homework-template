const express = require('express')

const ctrl = require('../../controllers/contacts')

const {ctrlWrapper} = require('../../helpers/')

const {validationContacts, isValidId} = require('../../middlewares')

const {schemas} = require('../../models/contact')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById))

router.post('/', validationContacts(schemas.addSchema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', isValidId, validationContacts(schemas.addSchema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', isValidId, validationContacts(schemas.upadateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact))

module.exports = router
