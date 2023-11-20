import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../models/contact.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

const contactAddValidate = validateBody(addSchema);
const updateFavoriteValidate = validateBody(updateFavoriteSchema);

contactsRouter.get("/", authenticate, contactsController.listContacts);

contactsRouter.get(
  "/:id",
  authenticate,
  isValidId,
  contactsController.getContactById
);

contactsRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  contactAddValidate,
  contactsController.addContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  updateFavoriteValidate,
  contactsController.updateFavorite
);

contactsRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsController.removeContact
);

export default contactsRouter;
