const express = require("express");
const validationFunctions = require("../../middlewares/validateMiddlewar");
const contactsServices = require("../../services/contactsService");
const { authMiddlewar } = require("../../middlewares/authMiddlewar");

const router = express.Router();

router.get("/", authMiddlewar, contactsServices.listContacts);

router.get("/:contactId", authMiddlewar, contactsServices.getContactById);

router.post(
  "/",
  authMiddlewar,
  validationFunctions.postContactsValidation,
  contactsServices.addContact
);

router.delete("/:contactId", authMiddlewar, contactsServices.removeContact);

router.put(
  "/:contactId",
  authMiddlewar,
  validationFunctions.putContactsValidation,
  contactsServices.updateContact
);

router.patch(
  "/:contactId/favorite",
  authMiddlewar,
  validationFunctions.patchContactsValidation,
  contactsServices.updateStatusContact
);

module.exports = router;
