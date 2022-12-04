const express = require("express");

const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/contacts");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", ctrlWrapper(ctrl.updateContact));

module.exports = router;
