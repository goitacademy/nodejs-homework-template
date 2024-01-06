import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { contactAddSchema, contactUpdateSchema } from '../../models/Contact.js';

// ============================================================

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactAddSchema), contactsController.add);

contactsRouter.put(
  '/:contactId',
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);

contactsRouter.delete('/:contactId', contactsController.deleteById);

export default contactsRouter;
