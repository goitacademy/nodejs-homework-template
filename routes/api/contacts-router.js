import express from 'express';

import contactControlles from '../../controllers/contact-controllers.js';

import contactsSchemas from '../../schemas/contacts-schemas.js';
import { validateBody } from '../../decorators/index.js';
import isEmptyBody from '../../middlewars/isEmptyBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactControlles.getAll);

contactsRouter.get('/:id', contactControlles.getById);

contactsRouter.post(
  '/',
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  contactControlles.add
);

contactsRouter.delete('/:id', contactControlles.deleteById);

contactsRouter.put(
  '/:id',
  isEmptyBody,
  validateBody(contactsSchemas.contactAddSchema),
  contactControlles.updateById
);

export default contactsRouter;