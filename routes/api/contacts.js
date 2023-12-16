const express = require("express");
const contactsController = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", contactsController.getContacts);
router.get("/:id", contactsController.getContactById);
router.post("/", contactsController.createContact);
router.delete("/:id", contactsController.deleteContact);
router.put("/:id", contactsController.updateContactInfo);

module.exports = router;
