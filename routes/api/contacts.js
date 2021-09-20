const express = require('express')

const { contactSchema } = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlwares')
const { contacts: contactsController } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(contactsController.listContacts))

router.get('/:contactId', controllerWrapper(contactsController.getContactById))

router.post(
  '/',
  validation(contactSchema),
  controllerWrapper(contactsController.addContact)
)

router.delete(
  '/:contactId',
  controllerWrapper(contactsController.removeContactById)
)

router.put(
  '/:contactId',
  validation(contactSchema),
  controllerWrapper(contactsController.updateContactById)
)

module.exports = router
