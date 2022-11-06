const express = require("express");

const router = express.Router();

const contactControllers = require("../../controllers/contactsControllers");

router.get("/", contactControllers.listContacts);

router.get("/:contactId", contactControllers.getContactById);

router.post("/", contactControllers.addContact);

router.delete("/:contactId", contactControllers.removeContact);

router.put("/:contactId", contactControllers.updateContact);

module.exports = router;
