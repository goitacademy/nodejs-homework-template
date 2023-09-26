const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')


const contacts = require('../../models/contacts')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', ctrl.addContact)

router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', ctrl.updateContact)

module.exports = router
