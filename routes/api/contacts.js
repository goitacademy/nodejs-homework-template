import express from "express";
import contactsController from "../../controllers/contacts_controller.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', contactsController.getContactById)

contactsRouter.post('/', isEmptyBody, contactsController.addContact)

contactsRouter.put('/:contactId', isEmptyBody, contactsController.updateById)

contactsRouter.delete('/:contactId', contactsController.deleteById)

export default contactsRouter;
