import express from "express";

import {
  validateBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";
import { contactsControllers } from "../../controllers/index.js";
import { addSchema } from "../../models/contact/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsControllers.listContacts);

contactsRouter.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.getContactById
);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(addSchema),
  contactsControllers.addContact
);

contactsRouter.delete(
  "/:contactId",
  authenticate,
  contactsControllers.removeContact
);

contactsRouter.put(
  "/:contactId",
  isValidId,
  validateBody(addSchema),
  contactsControllers.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  contactsControllers.updateFavorite
);

export default contactsRouter;
