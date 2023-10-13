import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
} from "../../models/Contact.js";

const contactAddValidate = validateBody(contactAddSchema);
const contactFavoriteValidate = validateBody(contactUpdateFavoriteSchema);

const router = express.Router();

router.get("/", contactsController.getAll);

router.get("/:contactId", isValidId, contactsController.getById);

router.post("/", isEmptyBody, contactAddValidate, contactsController.add);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  contactAddValidate,
  contactsController.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactFavoriteValidate,
  contactsController.updateStatusContact
);

router.delete("/:contactId", isValidId, contactsController.deleteById);

export default router;
