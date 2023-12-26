import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../../schemas/contact-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.addContact
);

contactsRouter.delete("/:contactId", contactsController.removeContact);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateContact
);

export default contactsRouter;
