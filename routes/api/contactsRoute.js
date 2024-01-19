import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import { isValidId } from "../../middlewares/isValidId.js";
import validateBody from "../../decorators/validateBody.js";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
  contactUpdateSchema,
} from "../../models/Contact.js";
import authenticate from "../../middlewares/autheticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);
contactsRouter.get("/", contactsController.listContacts);
contactsRouter.get("/:id", isValidId, contactsController.getContactById);
contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.addContact
);
contactsRouter.put(
  "/:id",
  isEmptyBody,
  isValidId,
  validateBody(contactUpdateSchema),
  contactsController.updateById
);
contactsRouter.delete("/:id", isValidId, contactsController.removeContact);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateFavoriteSchema),
  contactsController.updateById
);

export default contactsRouter;
