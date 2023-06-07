const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts-controller");

router.get("/", contactsController.getListContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.updateStatusContact);

module.exports = router;
