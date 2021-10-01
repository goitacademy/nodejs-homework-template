const express = require('express')
const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlewares')
const contactsController = require('../../controllers/contacts')
const router = express.Router()

router.get('/', controllerWrapper(contactsController.getContacts))

router.get('/:id', controllerWrapper(contactsController.getContactById))

router.post('/', validation(contactSchema), controllerWrapper(contactsController.addContact))

router.put('/:id', validation(contactSchema), controllerWrapper(contactsController.updateContactsById))

router.delete('/:id', controllerWrapper(contactsController.removeContact))

module.exports = router
