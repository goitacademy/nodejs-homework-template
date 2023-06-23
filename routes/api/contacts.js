const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.addContact);

router.put("/:id", ctrl.updateById);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
