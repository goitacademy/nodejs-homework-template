import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import isEmptyBody from "../../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post('/', isEmptyBody, contactsController.add);

contactsRouter.delete('/:contactId', contactsController.deleteById);

contactsRouter.put('/:contactId', isEmptyBody, contactsController.updateContact);

export default contactsRouter
