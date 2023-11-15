import express from "express";
import ctrl from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../models/contact.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

const contactAddvalidate = validateBody(addSchema);
const updateFavoriteValidate = validateBody(updateFavoriteSchema);

contactsRouter.get("/", ctrl.listContacts);

contactsRouter.get("/:id", isValidId, ctrl.getContactById);

contactsRouter.post("/", isEmptyBody, contactAddvalidate, ctrl.addContact);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddvalidate,
  ctrl.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  updateFavoriteValidate,
  ctrl.updateFavorite
);

contactsRouter.delete("/:id", isValidId, ctrl.removeContact);

export default contactsRouter;
