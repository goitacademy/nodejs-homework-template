const express = require("express");
const router = express.Router();

const contactsControllers = require("../../controllers/contacts-controllers");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post("/", contactsControllers.addContact);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put("/:contactId", contactsControllers.updateContact);

module.exports = router;
