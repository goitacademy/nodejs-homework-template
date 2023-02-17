const express = require("express");
const { contatsControllers } = require("../../controllers");
const { contactsValidation } = require("../../middlewares/contacts");
const { auth } = require("../../middlewares/users");
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

router.get("/", auth, contatsControllers.getAll);

router.get("/:contactId", auth, contatsControllers.getById);

router.post("/", auth, validationAddContact, contatsControllers.add);

router.put(
  "/:contactId",
  auth,
  validationUpdateContact,
  contatsControllers.update
);

router.patch(
  "/:contactId/favorite",
  auth,
  validationUpdateStatusContact,
  contatsControllers.updateStatusContact
);

router.delete("/:contactId", auth, contatsControllers.remove);

module.exports = router;
