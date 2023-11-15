import express from "express";
import ctrl from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { addSchema, updateFavoriteSchema } from "../../models/contact.js";
import { validateBody } from "../../decorators/index.js";

const contactsRouter = express.Router();

const contactAddvalidate = validateBody(addSchema);
const updateFavoriteValidate = validateBody(updateFavoriteSchema);

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", isEmptyBody, contactAddvalidate, ctrl.addContact);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactAddvalidate,
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBody,
  updateFavoriteValidate,
  ctrl.updateFavorite
);

router.delete("/:id", isValidId, ctrl.removeContact);

export default contactsRouter;
