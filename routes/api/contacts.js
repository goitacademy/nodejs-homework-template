const express = require("express");
const contactsControllers = require("../../controllers/contacts-controllers");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactById);

router.post("/", contactsControllers.addContact);

router.delete("/:contactId", isValidId, contactsControllers.deleteContactById);

router.put("/:contactId", isValidId, contactsControllers.updateContactById);

router.patch(
  ":contactId/favorite",
  isValidId,
  contactsControllers.updateStatusContact
);

module.exports = router;
