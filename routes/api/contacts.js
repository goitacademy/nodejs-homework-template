import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import validateContact from "../../middleware/validation/contact-validation.js";

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateContact.addContactValidate,
  contactsController.addContact
);

router.delete("/:contactId", contactsController.removeContact);

router.put(
  "/:contactId",
  validateContact.addContactValidate,
  contactsController.updateContact
);

export default router;
