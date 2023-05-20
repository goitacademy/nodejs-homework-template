const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", ctrl.updateContact);

module.exports = router;
