const express = require("express");
const contactsController= require("../../controllers/contact-controller.js")
const router = express.Router();



router.get("/", contactsController.getAllContacts);

router.get("/:id",contactsController.getContactByIdb );

router.post("/", contactsController.addContact );

router.delete("/:id", contactsController.removeContact );

router.put("/:id", contactsController.updateContact);

module.exports = router;
