import { Router } from 'express'
import { add, deleteById, getAll, getById, updateById } from '../../controllers/contactsController.js'
import { validateBody } from '../../decorators/validateBody.js'
import { isEmptyBody } from '../../middlewares/isEmptyBody.js'
import { isValidId } from '../../middlewares/isValidId.js'
import { contactAddSchema, contactUpdateFavoriteSchema, contactUpdateSchema } from '../../models/Contact.js'

export const contactsRouter = Router()

contactsRouter.get('/', getAll)

contactsRouter.get('/:id', isValidId, getById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), add)

contactsRouter.put('/:id', isValidId, isEmptyBody, validateBody(contactUpdateSchema), updateById)

contactsRouter.patch('/:id/favorite', isValidId, validateBody(contactUpdateFavoriteSchema), updateById)

contactsRouter.delete('/:id', isValidId, deleteById)
