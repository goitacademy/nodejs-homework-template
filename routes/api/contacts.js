const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getOneContact);

router.post("/", ctrl.addNewContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.updateContactById);

module.exports = router;
