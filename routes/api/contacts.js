const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validatedBody } = require("../../middleware");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validatedBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validatedBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
