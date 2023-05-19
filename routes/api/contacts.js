const express = require("express");

const router = express.Router();
const contactControler = require("../../controlers/contact-controler");
// const Schema = require("../../schemas/contact-schemas");
// const validateBody = require("../../decorator/validateBody");

router.get("/", contactControler.getAllContacts);

router.get("/:id", contactControler.getContactsById);

router.put("/:id", contactControler.updateContact);

// CHANG POST (PUT)

router.post("/", contactControler.addContact);

router.delete("/:id", contactControler.removeContacts);

router.put("/:id", contactControler.updateStatusContact);

module.exports = router;
