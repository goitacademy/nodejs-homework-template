import express from "express";
import contactsController from "../../controllers/contacts_controller.js";
import { isEmptyBody } from "../../middlewares/isEmptyBody.js";
import { validateBody } from "../../decorator/ValidateBody.js";
import { addContactSchema, updateContactSchema } from "../../schemas/contactSchema.js"

const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', contactsController.getContactById)

contactsRouter.post('/', isEmptyBody, validateBody(addContactSchema), contactsController.addContact)

contactsRouter.put('/:contactId', isEmptyBody, validateBody(updateContactSchema), contactsController.updateById)

contactsRouter.delete('/:contactId', contactsController.deleteById)

export default contactsRouter;
