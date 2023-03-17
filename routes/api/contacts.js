const express = require('express')
const router = express.Router()
const controller = require("../../controllers/index")


router.get('/', controller.getContacts)

router.get('/:contactId', controller.getContactsById)

router.post('/', controller.createdContact);

router.delete('/:contactId', controller.deletedContact)

router.put('/:contactId', controller.updateContactById)

router.patch('/:contactId/favorite', controller.updatedStatusContact)

module.exports = router
