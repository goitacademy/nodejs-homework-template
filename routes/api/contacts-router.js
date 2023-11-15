import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from "../../schemas/contacts-schemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getListContacts);

contactsRouter.get("/:contactId", contactsController.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsAddSchema),
  contactsController.addContactById
);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactsUpdateSchema),
  contactsController.updateContactsById
);

contactsRouter.delete("/:contactId", contactsController.deleteContactById);

export default contactsRouter;
