const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

router.get("/", express.json(), ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", express.json(), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.patch("/:contactId", ctrl.updateContact);

router.patch('/:contactId/favorite', ctrl.updateContactStatus);

module.exports = router;
