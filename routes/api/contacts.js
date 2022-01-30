const express = require("express");

const { contacts: ctrl } = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.put("/:id", ctrl.updateContact);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
