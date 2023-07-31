const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/controllers");
const validateBody = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
