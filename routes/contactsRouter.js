const express = require('express')
const router = express.Router()
const controller = require('../controllers/constactsController')

router.get('/', controller.listContacts)

router.get('/:contactId', controller.getContactById)

router.post('/', controller.addContact)

router.delete('/:contactId', controller.removeContact)

router.put('/:contactId', controller.updateContact)

router.patch('/:contactId', controller.updateStatusContact)

module.exports = router
