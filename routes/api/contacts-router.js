import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';
import { validateBody } from '../../decorators/index.js';
import {
  isEmptyBody,
  isEmptyFavorite,
  isValidId,
  authenticate,
} from '../../middlewares/index.js';

import contactsSchemas from '../../schemas/contacts-schemas.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post(
  '/',
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

contactsRouter.put(
  '/:contactId',
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyFavorite,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
