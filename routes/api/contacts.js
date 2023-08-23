const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { validationContact } = require("../../schemas");

router.get("", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("", validateBody(validationContact), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(validationContact), ctrl.updateContact);

module.exports = router;
