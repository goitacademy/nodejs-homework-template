import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddScheme,
  contactFavoteSchema,
  contactUpdateScheme,
} from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.allContacts);
contactsRouter.get("/:id", isValidId, contactsController.getContactById);
contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddScheme),
  contactsController.add
);
contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateScheme),
  contactsController.updateById
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(contactFavoteSchema),
  contactsController.updateStatusContact
);
contactsRouter.delete("/:id", isValidId, contactsController.removeContact);

export default contactsRouter;
