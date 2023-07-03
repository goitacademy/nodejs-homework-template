const express = require("express");
const contactsController = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", contactsController.getContacts);
router.get("/:contactId", contactsController.getContactById);
router.post("/", contactsController.createContact);
router.delete("/:contactId", contactsController.deleteContact);
router.put("/:contactId", contactsController.updateContact);
router;

module.exports = router;
