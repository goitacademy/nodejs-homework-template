const express = require('express')

const {
  contactAddSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
} = require('../../joiSchemas')
const {
  controllerWrapper,
  validation,
  validationId,
} = require('../../middlwares')
const { contacts: contactsController } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(contactsController.listContacts))

router.get(
  '/:contactId',
  validationId(),
  controllerWrapper(contactsController.getContactById)
)

router.post(
  '/',
  validation(contactAddSchema),
  controllerWrapper(contactsController.addContact)
)

router.delete(
  '/:contactId',
  validationId(),
  controllerWrapper(contactsController.removeContactById)
)

router.put(
  '/:contactId',
  [validationId(), validation(contactUpdateSchema)],
  controllerWrapper(contactsController.updateContactById)
)

router.patch(
  '/:contactId/favorite',
  [validationId(), validation(contactStatusUpdateSchema)],
  controllerWrapper(contactsController.updateStatusContact)
)

module.exports = router
