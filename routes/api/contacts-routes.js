const express = require("express");

const ctrl = require("../../controllers/contacts-controllers");

const { validateBody } = require("../../utils");

const schema = require("../../schemas/contacts-schema");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addNewContact);

router.delete("/:contactId", ctrl.deleteContactById);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.updateOneContact);

module.exports = router;
