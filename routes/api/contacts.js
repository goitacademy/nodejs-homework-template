const express = require("express");
const router = express.Router();
const cntr = require('../../controllers/contacts')

router.get("/", cntr.listContacts);

router.get("/:id", cntr.getContactById);

router.post("/", cntr.addContact);

router.delete("/:id", cntr.removeContact);

router.put("/:id", cntr.updateContact);

module.exports = router;
