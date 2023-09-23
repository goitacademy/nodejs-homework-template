import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import * as contactSchemas from "../../models/Contact.js";

import { validateBody } from "../../decorators/decorators.js";

import { isValidId } from "../../middlewares/middlewares.js";

const contactAddValidate = validateBody(contactSchemas.ContactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactSchemas.ContactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.listContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);

contactsRouter.post("/", contactAddValidate, contactsController.addContact);

contactsRouter.put(
  "/:id",
  isValidId,
  contactAddValidate,
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.updateContact
);

contactsRouter.delete("/:id", isValidId, contactsController.removeContact);

export default contactsRouter;
