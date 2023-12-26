const express = require("express");
const router = express.Router();

const contactsController = require("../../controllers/contactsController");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post("/", contactsController.postContact);

router.delete("/:contactId", contactsController.deleteContacts);

router.put("/:contactId", contactsController.updateContact);

router.patch("/:contactId/favorite", contactsController.updateStatusContact);

module.exports = router;
