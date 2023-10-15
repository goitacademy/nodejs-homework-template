import express from 'express'

import contactsControllers from '../../controllers/contacts-controllers.js'
const contactsRouter = express.Router()

contactsRouter.get('/', contactsControllers.getAll)

contactsRouter.get('/:id', contactsControllers.getById)

contactsRouter.post('/',contactsControllers.add)

contactsRouter.put('/:id', contactsControllers.updateById)

contactsRouter.delete('/:id', contactsControllers.deleteById)

export default contactsRouter
