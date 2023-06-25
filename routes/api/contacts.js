const express = require("express");

const ctrl = require("../../controlers/contacts");

const { validateBody } = require("../../middlewares");

const schema = require("../../schemas/contacts")

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId",  validateBody(schema.addSchema), ctrl.updateContact);

module.exports = router;
