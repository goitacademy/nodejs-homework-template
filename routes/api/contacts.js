import express from 'express';

import contactsController from '../../controllers/contactControllers.js'

import contactsSchema from '../../schema/schemaJoi.js'

import { validateBody, validateFavoriteBody } from '../../decorators/index.js';

import { isEmptyBody, isValidId } from '../../middlewars/index.js';


const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post('/',validateBody(contactsSchema.contactsAddSchema), contactsController.add);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter.put('/:contactId', isValidId, isEmptyBody, validateBody(contactsSchema.contactsAddSchema), contactsController.updateById);

contactsRouter.patch('/:contactId/favorite', isValidId, validateFavoriteBody(contactsSchema.contactUpdateFavoriteSchema), contactsController.updateFavorite);

contactsRouter.put('/:contactId', isEmptyBody, validateBody(contactsSchema.contactsAddSchema), contactsController.updateById);


export default contactsRouter;
