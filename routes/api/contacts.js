const express = require("express");
const router = express.Router();
const ContactsController = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares");

router.get("/", ContactsController.listContacts);

router.get("/:contactId", isValidId, ContactsController.getContactById);

router.post("/", ContactsController.addContact);

router.patch("/:contactId/favorite", ContactsController.updateStatusContact);

router.delete("/:contactId", ContactsController.removeContact);

router.put("/:contactId", ContactsController.updateContact);

module.exports = router;
