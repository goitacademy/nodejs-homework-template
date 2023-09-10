import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import validateContact from "../../middleware/validation/contact-validation.js";
import isValidId from "../../middleware/isValidID.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateContact.addContactValidate,
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateContact.addContactValidate,
  contactsController.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateContact.contactUpdateFavoriteValidate,
  contactsController.updateContact
);

export default router;
