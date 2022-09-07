const express = require("express");
// const { response } = require("../../../app");
// const { updateContact } = require("../../../models/contacts");
// const contactsFunctions = require("../../../models/contacts");
const validationFunctions = require("../../middlewares/validateMiddlewar");
const contactsServices = require("../../services/contactsService");

const router = express.Router();

router.get("/", contactsServices.listContacts);

router.get("/:contactId", contactsServices.getContactById);

router.post(
  "/",
  validationFunctions.postContactsValidation,
  contactsServices.addContact
);

router.delete("/:contactId", contactsServices.removeContact);

router.put(
  "/:contactId",
  validationFunctions.putContactsValidation,
  contactsServices.updateContact
);

router.patch(
  "/:contactId/favorite",
  validationFunctions.patchContactsValidation,
  contactsServices.updateStatusContact
);

module.exports = router;
