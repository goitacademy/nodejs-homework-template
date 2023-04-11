const express = require("express");

const ctrl = require("../../controllers/contacts")

const {validateBody} = require("../../middlewares");
const validateSchemaBody = require("../../validateSchemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(validateSchemaBody), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(validateSchemaBody), ctrl.updateContact);

module.exports = router;