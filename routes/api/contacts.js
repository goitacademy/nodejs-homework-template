const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contactsController");

router.get("/", ctrl.allContacts);

router.get("/:id", ctrl.contactById);

router.post("/", ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", ctrl.updateContact);

module.exports = router;
