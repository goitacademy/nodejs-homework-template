const express = require('express')
const router = express.Router()
const { validation, controller, authorization } = require('../../middlewares')
const {
  contactModel: { JoiSchemaContact },
} = require('../../models')
const { contacts } = require('../../controllers')

router.get('/', authorization(), controller(contacts.listContacts))

router.get('/:contactId', authorization(), controller(contacts.getContactById))

router.post('/', authorization(), validation(JoiSchemaContact), controller(contacts.addContact))

router.delete('/:contactId', authorization(), controller(contacts.removeContact))

router.patch(
  '/:contactId',
  authorization(),
  validation(JoiSchemaContact),
  controller(contacts.updateContact)
)

module.exports = router
