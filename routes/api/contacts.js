const express = require("express");

const router = express.Router();

const ctrlWrapper = require("../../helpers/ctrlWrapper");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", ctrlWrapper(ctrl.addContact));

router.put("/:contactId", ctrlWrapper(ctrl.updateContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
