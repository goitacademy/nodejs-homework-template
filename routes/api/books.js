const express = require("express");
const Contact = require("../../models/contact");
const router = express.Router();
const contactControler = require("../../controlers/contact-controler");

router.get("/", contactControler.getAllContacts);

router.get("/:id", contactControler.getContactsById);

router.post("/", contactControler.getContactsById);

// CHANG POST (PUT)

router.put("/:id", contactControler.addContact);

router.delete("/:id", contactControler.removeContacts);
module.exports = router;
