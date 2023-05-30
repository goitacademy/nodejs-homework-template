const express = require("express");

const ctrl = require("../../controllers/contacts/contacts");


const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getById);

router.post("/",  ctrl.addContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", ctrl.updateContactById);

module.exports = router;
