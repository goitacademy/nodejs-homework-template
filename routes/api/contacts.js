const express = require("express");
const router = express.Router();
const ctrl = require('../../controllers/contacts')


router.get("/", ctrl.allContacts);

router.get("/:contactId", ctrl.contactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", ctrl.updateContact);

module.exports = router;
