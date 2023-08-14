import express  from 'express';

import contactsController from '../../controllers/contacts-controller.js';

import contactSchema from '../../schemas/contacts-schemas.js';

import { validateBody } from '../../decorators/index.js';

import {isEmptyBody, isValidId} from '../../middlewars/index.js';


const contactsRouter = express.Router()

contactsRouter.get('/', contactsController.getAll)

contactsRouter.get('/:id', isValidId, contactsController.getById)

contactsRouter.post('/', isEmptyBody.isEmptyBody, validateBody(contactSchema.contactsAddSchema), contactsController.add)

contactsRouter.delete('/:id', isValidId, contactsController.deleteById)

contactsRouter.put('/:id', isValidId, isEmptyBody.isEmptyBody, validateBody(contactSchema.contactsAddSchema), contactsController.updateById)

contactsRouter.patch('/:id/favorite', isValidId, isEmptyBody.isEmptyBodyFavorite, validateBody(contactSchema.contactUpdateFavoriteSchema), contactsController.updateStatusContact)


export default contactsRouter;
