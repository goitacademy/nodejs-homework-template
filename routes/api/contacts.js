const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schema");

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.delete("/:id", ctrl.removeContact);
router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
