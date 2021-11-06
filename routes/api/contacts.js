const express = require("express");
const router = express.Router();
const { contacts: ctr } = require("../../controllers");

router.get("/", ctr.getAllContacts);

router.get("/:contactId", ctr.getContactById);

router.post("/", ctr.addContact);

router.delete("/:contactId", ctr.deleteContact);

router.put("/:contactId", ctr.updateContactById);

module.exports = router;
