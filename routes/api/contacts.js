const express = require("express");

const router = express.Router();

const { contacts: ctrl } = require("../../fetch");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addNewContact);

router.delete("/:contactId", ctrl.removeById);

router.put("/:contactId", ctrl.editById);

module.exports = router;