const express = require("express");
const ctrl = require("../../models/contacts");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", ctrlWrapper(ctrl.updateContact));

module.exports = router;
