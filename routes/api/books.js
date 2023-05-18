const express = require("express");
const Contact = require("../../models/contact");
const router = express.Router();
const contactControler = require("../../controlers/contact-controler");
const Schema = require("../../schemas/contact-schemas");
const { validateContacts } = require("../../decorator/validateBody");

router.get("/", contactControler.getAllContacts);

router.get("/:id", contactControler.getContactsById);

router.post(
  "/",
  contactControler.validateContacts(Schema.addContact),
  updateContact
);

// CHANG POST (PUT)

router.put("/:id", contactControler.addContact);

router.delete("/:id", contactControler.removeContacts);
module.exports = router;
