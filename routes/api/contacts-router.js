import express from "express";
import ctrl from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../models/contact.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

const contactAddValidate = validateBody(addSchema);
const updateFavoriteValidate = validateBody(updateFavoriteSchema);

contactsRouter.get("/", ctrl.listContacts);

contactsRouter.get("/:id", isValidId, ctrl.getContactById);

contactsRouter.post("/", isEmptyBody, contactAddValidate, ctrl.addContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  updateFavoriteValidate,
  ctrl.updateFavorite
);

contactsRouter.delete("/:id", isValidId, ctrl.removeContact);

export default contactsRouter;
