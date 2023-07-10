const express = require("express");
const ctrl = require("../../controlers");
const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getOneContactById);

router.post("/", ctrl.addOneContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.updateContact);

module.exports = router;