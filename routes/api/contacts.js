const express = require('express')
const router = express.Router()

const { contactsSchema } = require('../../schemas')

const { ctrlWrap, validation } = require('../../middlewares')
const ctrl = require('../../controllers')

router.get('/', ctrlWrap(ctrl.listContacts))

router.get('/:contactId', ctrlWrap(ctrl.getContactById))

router.post('/', validation(contactsSchema), ctrlWrap(ctrl.addContact))

router.put('/:contactId', validation(contactsSchema), ctrlWrap(ctrl.updateContact))

router.delete('/:contactId', ctrlWrap(ctrl.removeContact))

module.exports = router
