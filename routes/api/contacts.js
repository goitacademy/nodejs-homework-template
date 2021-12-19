const express = require('express')
const router = express.Router()

const ctrl = require('../../controllers')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', ctrl.updateContact)

module.exports = router
