import { Router } from 'express'
import contactsController from '../../controllers/contactsController.js'
import { validateBody } from '../../decorators/validateBody.js'
import { isEmptyBody } from '../../middlewares/isEmptyBody.js'
import { contactAddSchema, contactUpdateSchema } from '../../schemas/contactsSchema.js'

export const contactsRouter = Router()

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:id', contactsController.getById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.add)

contactsRouter.put('/:id', isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById)

contactsRouter.delete('/:id', contactsController.deleteById)
