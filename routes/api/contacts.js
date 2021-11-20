const express = require('express')
const router = express.Router()
const { controllerWrapper, validator } = require('../../middlewares')
const { contactsSchema } = require('../../schemas')
// const { contacts: ctrl } = require('../../contactsOperations/contacts/contacts')
const { contacts } = require('../../contactsOperations')

router.get('/', controllerWrapper(contacts.listContacts))
router.get('/:contactId', controllerWrapper(contacts.getContactById))

router.post('/', validator(contactsSchema), controllerWrapper(contacts.addContact))

router.delete('/:contactId', controllerWrapper(contacts.removeContactById))

router.put(
  '/:contactId',
  validator(contactsSchema),
  controllerWrapper(contacts.updateContactById)
)

module.exports = router
