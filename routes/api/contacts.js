const express = require('express')

const {
  contactAddSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
} = require('../../schemas')
const { controllerWrapper, validation } = require('../../middlwares')
const { contacts: contactsController } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(contactsController.listContacts))

router.get('/:contactId', controllerWrapper(contactsController.getContactById))

router.post(
  '/',
  validation(contactAddSchema),
  controllerWrapper(contactsController.addContact)
)

router.delete(
  '/:contactId',
  controllerWrapper(contactsController.removeContactById)
)

router.put(
  '/:contactId',
  validation(contactUpdateSchema),
  controllerWrapper(contactsController.updateContactById)
)

router.patch(
  '/:contactId/favorite',
  validation(contactStatusUpdateSchema),
  controllerWrapper(contactsController.updateStatusContact)
)

module.exports = router
