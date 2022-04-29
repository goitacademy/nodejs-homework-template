const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:contactId", ctrl.updateContactById);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
