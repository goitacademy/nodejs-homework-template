import express from "express";

// import contactService from "../../models/contacts/index.js";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

import { contactAddSchema, contactUpdateSchema } from "../../models/Contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

// contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.add
);

// contactsRouter.delete("/:contactId", contactsController.deleteById);

// contactsRouter.put("/:contactId", isEmptyBody, contactsController.updateById);

export default contactsRouter;
