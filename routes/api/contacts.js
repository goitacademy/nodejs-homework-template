import express from "express";
import contactsRequests from "../../controllers/contacts-controller.js";
import { validateBody } from "../../decorators/index.js";
import {
  isValidId,
  isEmptyBody,
  isEmptyBodyFavorite,
} from "../../middleware/index.js";
import {
  newContactValidation,
  contactsEditValidation,
  contactsFavoriteValidation,
} from "../../schemas/contacts-validation.js";

const router = express.Router();

router.get("/", contactsRequests.getAllContacts);

router.get("/:contactId", isValidId, contactsRequests.getContactsById);

router.post(
  "/",
  isEmptyBody,
  validateBody(newContactValidation),
  contactsRequests.addNewContact
);

router.delete("/:contactId", isValidId, contactsRequests.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(contactsEditValidation),
  contactsRequests.editContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBodyFavorite,
  validateBody(contactsFavoriteValidation),
  contactsRequests.updateContact
);

export default router;