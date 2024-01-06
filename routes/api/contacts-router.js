import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';
import { isEmptyBody, isValidId, isEmptyStatus } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
} from '../../models/Contact.js';

// ============================================================

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', isValidId, contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.add);

contactsRouter.put(
  '/:contactId',
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyStatus,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

contactsRouter.delete('/:contactId', isValidId, contactsController.deleteById);

export default contactsRouter;
