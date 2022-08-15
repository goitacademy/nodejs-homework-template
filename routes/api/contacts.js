const express = require('express')

const ctrl = require('../../controllers/contacts')

const {ctrlWrapper} = require('../../helpers/')

const {validationContacts} = require('../../middlewares')

const schemas = require('../../schemas/contacts')

const router = express.Router()

router.get('/', ctrlWrapper(ctrl.listContacts))

router.get('/:contactId', ctrlWrapper(ctrl.getContactById))

router.post('/', validationContacts(schemas.contactSchema), ctrlWrapper(ctrl.addContact))

router.put('/:contactId', validationContacts(schemas.contactSchema), ctrlWrapper(ctrl.updateContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))

module.exports = router
