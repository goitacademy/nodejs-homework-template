import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import { contactsAddSchema, contactUpdateFavoriteSchema } from "../../models/Contact.js";
const contactAddValidate = validateBody(contactsAddSchema)
const contactUpdateFavoriteValidate = validateBody(contactUpdateFavoriteSchema)
const contactsRouter = express.Router();
contactsRouter.get('/', contactsController.getAllContacts);
contactsRouter.get('/:id', isValidId, contactsController.getContactById);
contactsRouter.post('/', isEmptyBody, contactAddValidate, contactsController.addContact)
contactsRouter.put('/:id', isValidId, isEmptyBody, contactAddValidate, contactsController.updateContact)
contactsRouter.patch("/:id/favorite", isValidId, contactUpdateFavoriteValidate, contactsController.updateFavorite);
contactsRouter.delete('/:id', isValidId, contactsController.removeContact)
export default contactsRouter;
