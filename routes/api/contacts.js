const express = require("express");

const router = express.Router();

const ctlr = require("../../controllers");

router.get("/", ctlr.getAllContacts);

router.get("/:contactId", ctlr.getContactById);

router.post("/", ctlr.addContact);

router.delete("/:contactId", ctlr.deleteContact);

router.put("/:contactId", ctlr.changeContact);

module.exports = router;
