const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { ctrlWrap } = require("../../helpers");

router.get("/", ctrlWrap(ctrl.listContacts));

router.get("/:contactId", ctrlWrap(ctrl.getContactById));

router.post("/", ctrlWrap(ctrl.addContact));

router.delete("/:contactId", ctrlWrap(ctrl.removeContact));

router.put("/:contactId", ctrlWrap(ctrl.updateContact));

router.patch("/:contactId/favorite", ctrlWrap(ctrl.updateContactStatus));

module.exports = router;
