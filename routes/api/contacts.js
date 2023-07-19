const express = require("express");
const router = express.Router();
const contactControllers = require("../../controllers/contactsControlers");

router.get("/", contactControllers.getContacts);

router.get("/:contactId", contactControllers.getContactById);

router.post("/", contactControllers.addContact);

router.delete("/:contactId", contactControllers.deleteContatcById);

router.put("/:contactId", contactControllers.updateContact);

module.exports = router;
