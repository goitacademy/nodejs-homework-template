const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const schema = require("../../schemes/contacts");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
