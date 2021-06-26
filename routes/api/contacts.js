const express = require('express')
const router = express.Router()
const { contacts: ctrl } = require('../../controllers')

router.get('/', ctrl.getAllContacts)

router.get('/:id', ctrl.getOneContact)

router.post('/', express.json(), ctrl.addContact)

router.put('/:id', express.json(), ctrl.updateContact)

router.delete('/:id', ctrl.deleteContact)

module.exports = router
