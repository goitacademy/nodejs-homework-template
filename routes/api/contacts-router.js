import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { addSchema, updateFavoriteSchema } from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsController.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(addSchema, "Missing required name field"),
  contactsController.addContact
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(addSchema, "Missing fields"),
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  validateBody(updateFavoriteSchema, "Missing field favorite"),
  contactsController.updateFavoriteById
);

export default contactsRouter;
