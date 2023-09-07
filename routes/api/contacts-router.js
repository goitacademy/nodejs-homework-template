import express from 'express';
import contactsController from '../../controllers/contacts-controller.js';
import contactsSchema from '../../schemas/contacts-schema.js';
import { validateBody } from '../../decorators/index.js';

const contactAddValidate = validateBody(contactsSchema.contactsAddSchema);

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', contactsController.getOneContact);

contactsRouter.post('/', contactAddValidate, contactsController.postContact);

contactsRouter.put(
  '/:contactId',
  contactAddValidate,
  contactsController.changeContact
);

contactsRouter.delete('/:contactId', contactsController.deleteContact);

export default contactsRouter;
