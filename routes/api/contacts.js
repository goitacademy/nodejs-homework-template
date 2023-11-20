const express = require("express");
const ctrl = require("../../controller/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
