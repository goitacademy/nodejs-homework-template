const express = require("express");
const { contatsControllers } = require("../../controllers");
const { contactsValidation } = require("../../middlewares/contacts");
const { contactsSchema } = require("../../schemas");

const router = express.Router();

const validationAddContact = contactsValidation.addContactsValidation(
  contactsSchema.addContactsSchema
);
const validationUpdateContact = contactsValidation.updateContactValidation(
  contactsSchema.updateContactSchema
);

router.get("/", contatsControllers.getAll);

router.get("/:contactId", contatsControllers.getById);

router.post("/", validationAddContact, contatsControllers.add);

router.delete("/:contactId", contatsControllers.remove);

router.put("/:contactId", validationUpdateContact, contatsControllers.update);

module.exports = router;
