import express from "express";
import contactController from "../../controllers/contactController.js";
import { isEmptyBody } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactsAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";
import isValidId from "../../middlewares/isValidId.js";

const contactAddValidate = validateBody(contactsAddSchema);
const contactUpdateFavorite = validateBody(contactUpdateFavoriteSchema);
const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", isValidId, contactController.getContactById);

contactsRouter.post(
  "/",
  isEmptyBody,
  contactAddValidate,
  contactController.addContact
);

contactsRouter.delete("/:id", isValidId, contactController.removeContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactController.updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavorite,
  contactController.updateFavorite
);

export default contactsRouter;