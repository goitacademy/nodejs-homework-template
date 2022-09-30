const express = require("express");
const { contacts: ctrl } = require("../../controller/index");
const router = express.Router();

router.get("/", ctrl.listContact);

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", ctrl.updateContact);

module.exports = router;
