const express = require("express");

const router = express.Router();
const contactControler = require("../../controlers/contact-controler");
// const Schema = require("../../schemas/contact-schemas");
// const validateBody = require("../../decorator/validateBody");

router.get("/", contactControler.getAllContacts);

router.get("/:id", contactControler.getContactsById);

router.post("/", contactControler.updateContact);

// CHANG POST (PUT)

router.put("/:id", contactControler.addContact);

router.delete("/:id", contactControler.removeContacts);
module.exports = router;
