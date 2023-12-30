import { Router } from 'express'
import contactsController from '../../controllers/contactsController.js'
import { validateBody } from '../../decorators/validateBody.js'
import { isEmptyBody } from '../../middlewares/isEmptyBody.js'
import { isValidId } from '../../middlewares/isValidId.js'
import { contactAddSchema, contactUpdateFavoriteSchema, contactUpdateSchema } from '../../models/Contact.js'

export const contactsRouter = Router()

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:id', isValidId, contactsController.getById)

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.add)

contactsRouter.put('/:id', isValidId, isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById)

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateById
)

contactsRouter.delete('/:id', isValidId, contactsController.deleteById)
