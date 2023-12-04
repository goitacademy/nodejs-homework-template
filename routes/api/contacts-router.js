import express from 'express'
import contactController from '../../controllers/contactsController.js'
import validateBody from '../../decorators/validateBody.js'
import { addContactSchema, addToFavoriteSchema, updateContactSchema } from '../../schemas/contactsSchemas.js'

const contactsRouter = express.Router()

contactsRouter.get('/', contactController.getAll)

contactsRouter.get('/:contactId', contactController.getById)

contactsRouter.post('/', validateBody(addContactSchema), contactController.addContact)

contactsRouter.delete('/:contactId', contactController.removeContact)

contactsRouter.put('/:contactId', validateBody(updateContactSchema), contactController.updateContact)

contactsRouter.patch('/:contactId/favorite', validateBody(addToFavoriteSchema), contactController.updateContact)

export default contactsRouter
