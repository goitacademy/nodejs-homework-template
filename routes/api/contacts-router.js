import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactfavoriteSchema,
} from "../../models/contact.js";

const contactAddValidate = validateBody(contactAddSchema);
const contactfavoriteValidate = validateBody(contactfavoriteSchema);

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

router.delete("/:contactId", isValidId, contactsController.deleteById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  contactfavoriteValidate,
  contactsController.updateFavorite
);

export default router;
