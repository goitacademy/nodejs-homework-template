import express from "express";
import { contactAddSchema, contactUpdateSchema, contactFavoriteSchema } from "../../models/Contact.js";
import contactsController from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";


const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getListContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);

contactsRouter.post("/", isEmptyBody, validateBody(contactAddSchema), contactsController.addContact);

contactsRouter.put("/:id", isValidId, isEmptyBody, validateBody(contactUpdateSchema), contactsController.updateById);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(contactFavoriteSchema), contactsController.updateById);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;

