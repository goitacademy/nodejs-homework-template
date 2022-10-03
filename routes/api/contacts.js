const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", ctrl.addNewContact);

router.delete("/:id", ctrl.removeContactById);

router.put("/:id", ctrl.updateContactById);

module.exports = router;
