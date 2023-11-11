// routes/api/contacts.js

const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

router.get("/", ctrl.listContacts);
router.get("/:id", ctrl.getContactById);
router.post("/", ctrl.addContact);
router.put("/:id", ctrl.updateContact);
router.delete("/:id", ctrl.removeContact);
router.patch("/:id/favorite", ctrl.favorite);

module.exports = router;
