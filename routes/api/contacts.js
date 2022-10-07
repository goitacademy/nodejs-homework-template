const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const ctrlWrapper = require("../../utils/ctrlWrapper");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put("/:contactId", ctrlWrapper(ctrl.updateContactById));

module.exports = router;
