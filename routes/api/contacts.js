const express = require('express')
const router = express.Router()
const ctrlContacts = require('../../controllers')
const { validateContact } = require('../../utils/validation.js')

router.get('/', ctrlContacts.get)
router.get('/:contactId', ctrlContacts.getById)
router.post('/', validateContact, ctrlContacts.create)
router.delete('/:contactId', ctrlContacts.remove)
router.put('/:contactId', validateContact, ctrlContacts.update)
router.patch('/:contactId/favorite', ctrlContacts.updateStatus)

module.exports = router