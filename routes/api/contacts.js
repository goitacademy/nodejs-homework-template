const express = require('express')

const { contacts: ctrl } = require('../../controllers')
const router = express.Router()

router.get('/', ctrl.listContact)

router.get('/:contactId', ctrl.getContactById)

router.post('/', express.json(), ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.patch('/:contactId', express.json(), ctrl.updateContact)

module.exports = router
