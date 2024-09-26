import express from 'express';

import contactControllers from '../../controllers/contact-controllers.js';

import { authenticate } from '../../middlewares/index.js';

import {
  isValidId,
  isEmptyBody,
  isEmptyFavoriteBody,
} from '../../middlewares/index.js';

import { validateBody } from '../../decorators/index.js';

import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from '../../models/contacts.js';

const router = express.Router();

router.use(authenticate);

router.get('/', contactControllers.getAllContacts);

router.get('/:contactId', isValidId, contactControllers.getContactsById);

router.post(
  '/',
  isEmptyBody,
  validateBody(contactAddSchema),
  contactControllers.addContact
);

router.put(
  '/:contactId',
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactControllers.updateContacts
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  isEmptyFavoriteBody,
  validateBody(contactFavoriteSchema),
  contactControllers.updateStatusContacts
);
router.delete('/:contactId', isValidId, contactControllers.deleteContact);

export default router;
