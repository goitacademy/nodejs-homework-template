import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
import contactsSchemas from '../../schemas/contacts-schemas.js';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId, authenticate } from '../../middlewars/index.js';


const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactsController.getAll);

contactsRouter.get('/:contactId', authenticate, isValidId, contactsController.getById);

contactsRouter.post('/', authenticate, isEmptyBody, validateBody(contactsSchemas.contactsAddSchema), contactsController.add);

contactsRouter.delete('/:contactId', authenticate, isValidId, contactsController.deleteById);

contactsRouter.put('/:contactId', authenticate, isValidId, isEmptyBody, validateBody(contactsSchemas.contactsAddSchema),contactsController.updateById);

contactsRouter.patch('/:contactId/favorite', authenticate, isValidId, isEmptyBody, validateBody(contactsSchemas.updateFavoriteSchema), contactsController.updateStatusContact);

export default contactsRouter;