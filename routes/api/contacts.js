const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addContact);

router.put("/:contactId", ctrl.updateById);

router.delete("/:contactId", ctrl.deleteById);

module.exports = router;
