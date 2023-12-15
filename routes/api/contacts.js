const express = require("express");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts')

router.get("/", ctrl.listContacts);

// router.get("/:contactId", ctrl.getContactById);

// router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

// router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

// router.delete("/:contactId", ctrl.deleteContact);

module.exports = router;
