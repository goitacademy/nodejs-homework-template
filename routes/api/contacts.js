const express = require("express");
const router = express.Router();

const { validateParams, validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", validateParams, ctrl.getContactById);

router.post("/", validateBody, ctrl.addContact);

router.delete("/:contactId", validateParams, ctrl.removeContact);

router.put("/:contactId", validateParams, validateBody, ctrl.updateContact);

module.exports = router;
