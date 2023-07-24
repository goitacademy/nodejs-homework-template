import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';
import { validateBody } from '../../decorators/index.js';
import {
  isEmptyBody,
  isEmptyFavorite,
  isValidId,
} from '../../middlewares/index.js';

import contactsSchemas from '../../schemas/contacts-schemas.js';

const router = express.Router();

router.get('/', contactsController.getAll);

router.get('/:contactId', isValidId, contactsController.getById);

router.post(
  '/',
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.add
);

router.delete('/:contactId', isValidId, contactsController.deleteById);

router.put(
  '/:contactId',
  isValidId,
  isEmptyBody,
  validateBody(contactsSchemas.contactsAddSchema),
  contactsController.updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyFavorite,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

export default router;
