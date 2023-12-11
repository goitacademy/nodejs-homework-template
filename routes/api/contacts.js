import express from "express";
import contactsControllers from "../../controllers/contacts-controllers.js";
import { validateBody } from "../../decorators/validateBody.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import {
  addContactSchema,
  updateContactSchema,
} from "../../validation-schemas/contacts-schemas.js";

export const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:contactId", contactsControllers.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(addContactSchema),
  contactsControllers.addNewContact
);

contactsRouter.delete("/:contactId", contactsControllers.deleteContactById);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsControllers.updateContactById
);
