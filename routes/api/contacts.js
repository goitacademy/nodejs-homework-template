import express from 'express';

import contactsController from "../../controllers/contacts-controller.js";

import { isEmtyBody } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.listContactsById);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', isEmtyBody, contactsController.addContactById);

contactsRouter.delete('/:contactId', contactsController.removeContactById);

contactsRouter.put('/:contactId', isEmtyBody, contactsController.updateContactById);

export default contactsRouter;