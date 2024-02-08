const express = require('express')
const contactControllers = require("../../controllers/index")

const router = express.Router()

router.get('/', contactControllers.getContacts)

router.get('/:contactId', contactControllers.getContactById)

router.post('/', contactControllers.createContact)

router.delete('/:contactId', contactControllers.deleteContact)

router.put('/:contactId', contactControllers.updateContact)

router.patch('/:contactId/favorite', contactControllers.updateContactByStatus)

module.exports = router
