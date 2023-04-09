const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const shemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(shemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(shemas.addSchema), ctrl.updateContact);

module.exports = router;
