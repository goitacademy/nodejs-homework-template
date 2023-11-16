const express = require("express");
const ctrl = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getById);

router.delete("/:contactId", ctrl.removeContact);

router.post("/", ctrl.addContact);

router.put("/:contactId", ctrl.updateContact);

module.exports = router;
