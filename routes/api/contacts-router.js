import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';
import contactsSchema from '../../schemas/contacts-schemas.js';
import { validateBody } from '../../decorators/index.js';
import { isValidId, authenticate } from '../../middlewars/index.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getContactsList);

contactsRouter.get('/:contactId', isValidId, contactsController.getContactById);

contactsRouter.post(
  '/',
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.addNewContact
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  contactsController.deleteContactById
);

contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.updateContactById
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(contactsSchema.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
