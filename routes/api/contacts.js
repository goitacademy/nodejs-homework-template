const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controller");
const {
  schemaAddContact,
  schemaUpdateContact,
} = require("../../schemas/contact");
const { controlWrapper, validation } = require("../../middlewares");

router.get("/", controlWrapper(controllerContacts.listContacts));

router.get("/:contactId", controlWrapper(controllerContacts.getContactById));

router.post(
  "/",
  validation(schemaAddContact),
  controlWrapper(controllerContacts.addContact)
);

router.delete("/:contactId", controlWrapper(controllerContacts.removeContact));

router.put(
  "/:contactId",
  validation(schemaUpdateContact),
  controlWrapper(controllerContacts.updateContactById)
);

module.exports = router;
