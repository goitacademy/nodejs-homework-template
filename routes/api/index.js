const express = require("express");
const router = express.Router();
const contactsController = require("../../controller");
const {
  validUpdateContact,
  validCreateContact,
} = require("../../middleWare/validation");

router.get("/", contactsController.getAllContact);
router.post("/", validCreateContact, contactsController.addContact);
router.get("/:contactId", contactsController.getContactById);
router.delete("/:contactId", contactsController.removeContact);
router.patch(
  "/:contactId",
  validUpdateContact,
  contactsController.updateContact
);

module.exports = router;
