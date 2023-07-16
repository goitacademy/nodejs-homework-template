import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';
import { validateBody } from '../../decorators/index.js';
import { isEmptyBody } from '../../middlewars/index.js';

import contactsSchemas from '../../schemas/contacts-schemas.js';

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', contactsController.getById);

router.post(
  '/',
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

router.delete('/:contactId', contactsController.deleteById);

router.put(
  '/:contactId',
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);

export default router;
