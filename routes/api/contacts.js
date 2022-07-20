const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers");

router.get("/", contactsControllers.listContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post("/", contactsControllers.addContact);

router.put("/:contactId", contactsControllers.updateContact);
router.patch("/:id/favorite", contactsControllers.updateStatusContact);

router.delete("/:contactId", contactsControllers.removeContact);

module.exports = router;
