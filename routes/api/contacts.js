const express = require('express')
const router = express.Router()
const ctrl = require("../../controllers/controllersContacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get('/', ctrl.listContacts)

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validateBody(schemas.schema), ctrl.updateContact);

module.exports = router;