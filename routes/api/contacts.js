const express = require("express");

const ctrl = require("../../controllers/contacts");

const validateBody = require("../../midllewares/validateBody");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:id", validateBody(schemas.updateSchema), ctrl.updateContact);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
