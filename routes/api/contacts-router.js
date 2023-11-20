import express from "express";
import ctrl from "../../controllers/contacts-controller.js";
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

contactsRouter.get("/", authenticate, ctrl.listContacts);

contactsRouter.get("/:id", authenticate, isValidId, ctrl.getContactById);

contactsRouter.post(
  "/",
  authenticate,
  isEmptyBody,
  contactAddValidate,
  ctrl.addContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  isValidId,
  isEmptyBody,
  contactAddValidate,
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  updateFavoriteValidate,
  ctrl.updateFavorite
);

contactsRouter.delete("/:id", authenticate, isValidId, ctrl.removeContact);

export default contactsRouter;
