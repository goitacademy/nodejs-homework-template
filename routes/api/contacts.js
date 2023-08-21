const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/contacts");
const addContactsValidate = validateBody(schemas.contactsSchema);

router.get("/", ctrl.getListContacts);

router.get("/:id", ctrl.getById);

router.post("/", addContactsValidate, ctrl.add);

router.delete("/:id", ctrl.delContact);

router.put("/:id", addContactsValidate, ctrl.updContact);

module.exports = router;
