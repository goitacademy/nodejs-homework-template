import express from "express";

import contactsControllers from "../../controllers/contacts-controller.js";

import { validateBody } from "../../decorators/index.js";

import contactsSchemas from "../../schemas/contacts-schemas.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", authenticate, contactsControllers.listContacts);

contactsRouter.get(
  "/:id",
  isValidId,
  authenticate,
  contactsControllers.getContactById
);

contactsRouter.post(
  "/",
  isEmptyBody,
  authenticate,
  validateBody(contactsSchemas.contactAddSchema),
  contactsControllers.addContact
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  authenticate,
  isValidId,
  validateBody(contactsSchemas.contactAddSchema),
  contactsControllers.updateContactById
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isEmptyBody,
  isValidId,
  validateBody(contactsSchemas.contactUpdateFavoriteSchema),
  contactsControllers.updateFavorite
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsControllers.removeContact
);

export default contactsRouter;
