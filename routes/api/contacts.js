const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middleware");
const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
