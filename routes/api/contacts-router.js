import express from 'express';

import contactsController from '../../controllers/contacts-controller.js';

import contactValidation from '../../middleware/validation/contact-validation.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getListContacts);

contactsRouter.get('/:id', contactsController.getContactById);

contactsRouter.post(
  '/',
  contactValidation.addContactValidate,
  contactsController.addContact
);

contactsRouter.delete('/:id', contactsController.removeContact);

contactsRouter.put(
  '/:id',
  contactValidation.addContactValidate,
  contactsController.updateContact
);

export default contactsRouter;
