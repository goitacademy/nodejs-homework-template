import express from 'express';

import contactsController from '../../controllers/contacts-controllers.js';
import contactsSchema from '../../schemas/contacts-schemas.js';
import { validateBody } from '../../decorators/index.js';
import { isValidId } from '../../middlewars/index.js';

const router = express.Router();

router.get('/', contactsController.getContactsList);

router.get('/:contactId', isValidId, contactsController.getContactById);

router.post(
  '/',
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.addNewContact
);

router.delete('/:contactId', isValidId, contactsController.deleteContactById);

router.put(
  '/:contactId',
  isValidId,
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.updateContactById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(contactsSchema.contactUpdateFavoriteSchema),
  contactsController.updateStatusContact
);

export default router;
