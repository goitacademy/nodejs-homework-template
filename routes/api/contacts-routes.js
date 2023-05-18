const express = require("express");
const contactsControllers = require("../../controllers/contacts-controllers");
const router = express.Router();

router.get("/", contactsControllers.getAllContacts);
router.get("/:contactId", contactsControllers.getContactById);
router.post("/", contactsControllers.addContact);
router.delete("/:contactId", contactsControllers.deleteContactById);
router.put("/:contactId", contactsControllers.updateContactById);

module.exports = router;
