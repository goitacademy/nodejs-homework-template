const express = require('express')

const ctrl = require('../../controllers/contacts')

const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', ctrl.addContact)

router.put('/:contactId', ctrl.updateContact)

router.delete('/:contactId', ctrl.removeContact)

module.exports = router
