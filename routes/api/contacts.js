const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, validateBodyPost } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBodyPost(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validateBody(schemas.updateSchema), ctrl.updateContact);

module.exports = router;
