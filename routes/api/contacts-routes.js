const express = require("express");
const ctrl = require("../../controllers/contacts-controllers");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:id", ctrl.deleteContactById);

router.put("/:id", ctrl.updateContact);

module.exports = router;
