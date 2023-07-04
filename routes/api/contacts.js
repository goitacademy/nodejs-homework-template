const express = require("express");
const ctrls = require("../../controllers/contacts");
const router = express.Router();

router.get("/", ctrls.getContacts);

router.get("/:contactId", ctrls.getContactById);

router.post("/", ctrls.addContact);

router.delete("/:contactId", ctrls.removeContact);

router.put("/:contactId", ctrls.updateContact);

module.exports = router;
