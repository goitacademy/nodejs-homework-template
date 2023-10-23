const express = require('express')
const contactsController = require('../../controllers/contacts')
const wrepper = require('../../helpers/controllerWrapper')
const validate = require('../../middlewares/validationMiddleware')
const schema  = require('../../schema/schema')

const router = express.Router()

router.get('/', wrepper(contactsController.listContacts))

router.get('/:contactId', wrepper(contactsController.getContactById))

router.post('/', validate(schema.contactSchema), wrepper(contactsController.addContact))

router.delete('/:contactId', wrepper(contactsController.removeContact))

router.put('/:contactId', validate(schema.contactSchema), wrepper(contactsController.updateContact))

router.patch('/:contactId/favorite', validate(schema.updateStatusContactSchema), wrepper(contactsController.updateStatusContact))

module.exports = router
