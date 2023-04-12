const express = require('express')
const { schemas } = require('../../models/contacts')
const validateBody = require('../../utils/validateBody')

const ctrl = require('../../controllers/contacts-controllers')
const contactsRouter = express.Router()

contactsRouter.get('/', ctrl.listContacts)

contactsRouter.post('/', validateBody(schemas.addSchema), ctrl.addContact)

contactsRouter.get('/:contactId', ctrl.getContactById)

contactsRouter.delete('/:contactId', ctrl.removeContact)

contactsRouter.put('/:contactId', validateBody(schemas.addSchema), ctrl.updateContact)

contactsRouter.patch(
	'/:contactId/favorite',
	validateBody(schemas.updateFavoriteSchema),
	ctrl.updateStatusContact
)

module.exports = contactsRouter
