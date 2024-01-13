const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schemas.schema), ctrl.addContact);

router.put("/:contactId", validateBody(schemas.schema), ctrl.updateContact);

router.delete("/:contactId", ctrl.deletedContact);

module.exports = router;
