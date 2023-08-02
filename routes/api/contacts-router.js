import express from 'express';
import contactsController from "../../controllers/contacts/index.js";
import contactsSchemas from '../../schemas/contacts-schemas.js';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody, isValidId, authenticate } from '../../middlewars/index.js';


const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsSchemas.contactsAddSchema), contactsController.add);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter.put('/:contactId', isValidId, isEmptyBody, validateBody(contactsSchemas.contactsAddSchema), contactsController.updateById);

contactsRouter.patch('/:contactId/favorite', isValidId, isEmptyBody, validateBody(contactsSchemas.updateFavoriteSchema), contactsController.updateStatusContact);

export default contactsRouter;