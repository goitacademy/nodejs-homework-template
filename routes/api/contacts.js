const express = require('express')

const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getById)

router.post('/', express.json(), ctrl.addContact)

router.put('/:contactId', express.json(), ctrl.updateContact)

router.delete('/:contactId', ctrl.removeContact)

module.exports = router
