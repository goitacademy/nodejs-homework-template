const express = require('express')
const router = express.Router()
const contactControllers = require('../../controllers/contacts');
const guard = require('../../helpers/guard')


router.get('/', guard, contactControllers.getAllContacts)

router.get('/:contactId', guard, contactControllers.getOneContact)

router.post('/',guard, contactControllers.addNewContact)

router.delete('/:contactId', guard, contactControllers.deleteContact)

router.patch('/:contactId', guard,  contactControllers.updateOneContact)

module.exports = router
