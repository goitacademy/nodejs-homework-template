const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.postContact);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.updateById);

module.exports = router;
