const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContactById);

router.put("/:contactId", ctrl.updateContactById);

module.exports = router;
