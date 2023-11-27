import express from 'express'
import contactController from '../../controllers/contactsController.js'

const contactsRouter = express.Router()

contactsRouter.get('/', contactController.getAll)

contactsRouter.get('/:contactId', contactController.getById)

contactsRouter.post('/', contactController.addContact)

contactsRouter.delete('/:contactId', contactController.removeContact)

contactsRouter.put('/:contactId', contactController.updateContact)


export default contactsRouter
