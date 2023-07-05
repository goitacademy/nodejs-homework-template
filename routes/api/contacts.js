const contactsController = require("../../controllers/contacts");
const express = require("express");
const router = express.Router();

router.get("/", contactsController.getContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.deleteContact);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.setFavorite);

module.exports = router;
