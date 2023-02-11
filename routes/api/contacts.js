const express = require("express");
const { contatsControllers } = require("../../controllers");
const { contactsValidation } = require("../../middlewares/contacts");
const {
  addContactsJoiSchema,
  updateContactJoiSchema,
  updateStatusJoiSchema,
} = require("../../models/contact");

const router = express.Router();

const validationAddContact =
  contactsValidation.addContactsValidation(addContactsJoiSchema);
const validationUpdateContact = contactsValidation.updateContactValidation(
  updateContactJoiSchema
);
const validationUpdateStatusContact = contactsValidation.updateStatusValidation(
  updateStatusJoiSchema
);

router.get("/", contatsControllers.getAll);

router.get("/:contactId", contatsControllers.getById);

router.post("/", validationAddContact, contatsControllers.add);

router.put("/:contactId", validationUpdateContact, contatsControllers.update);

router.patch(
  "/:contactId/favorite",
  validationUpdateStatusContact,
  contatsControllers.updateStatusContact
);

router.delete("/:contactId", contatsControllers.remove);

module.exports = router;
