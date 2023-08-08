const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, checkBody } = require("../../middelwares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id",checkBody, validateBody(schemas.addSchema), ctrl.updateContact);

router.delete("/:id", ctrl.removeContact);

module.exports = router;
