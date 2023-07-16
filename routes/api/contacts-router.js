import express from 'express';

import contactsController from '../../controllers/contacts-controllers.js';
import contactsSchema from '../../schemas/contacts-schemas.js';
import { validateBody } from '../../decorators/index.js';

const router = express.Router();

router.get('/', contactsController.getContactsList);

router.get('/:contactId', contactsController.getContactById);

router.post(
  '/',
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.addNewContact
);

router.delete('/:contactId', contactsController.deleteContactById);

router.put(
  '/:contactId',
  validateBody(contactsSchema.contactsAddSchema),
  contactsController.updateContactById
);

export default router;
