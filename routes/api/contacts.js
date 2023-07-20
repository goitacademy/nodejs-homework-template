const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../middlewares");

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContactById);

module.exports = router;
